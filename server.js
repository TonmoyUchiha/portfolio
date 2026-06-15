require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const compression = require('compression');
const path = require('path');

const app = express();

/* ── MIDDLEWARE ── */
app.use(compression());          // Gzip all responses
app.use(cors());
app.use(express.json());

/* ── MONGODB CONNECTION ── */
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set.');
  }
  cachedConnection = await mongoose.connect(MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  console.log('✓ MongoDB connected');
  return cachedConnection;
}

// Database connection middleware for API routes
app.use('/api', async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('✗ Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
  }
});

/* ── MONGOOSE MODELS ── */
const DataSchema = new mongoose.Schema({ data: Object }, { strict: false });
const DataModel = mongoose.models.PortfolioData || mongoose.model('PortfolioData', DataSchema);

const CVSchema = new mongoose.Schema({ contentType: String, data: Buffer });
const CVModel = mongoose.models.CV || mongoose.model('CV', CVSchema);

/* ═══════════════════════════════════════════
   IN-MEMORY CACHE
   Avoids hitting MongoDB on every visitor page load.
   Cache is busted on POST /api/data so admin changes
   appear instantly.
   ═══════════════════════════════════════════ */
let cache = {
  data: null,
  timestamp: 0,
  TTL: 5 * 60 * 1000  // 5 minutes
};

function isCacheValid() {
  return cache.data !== null && (Date.now() - cache.timestamp) < cache.TTL;
}

function bustCache() {
  cache.data = null;
  cache.timestamp = 0;
}

/* ── HEALTH ENDPOINT ── */
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: dbState === 1 ? 'healthy' : 'degraded',
    database: states[dbState] || 'unknown',
    cacheAge: cache.data ? `${Math.round((Date.now() - cache.timestamp) / 1000)}s` : 'empty',
    uptime: `${Math.round(process.uptime())}s`
  });
});

/* ── GET DATA API (with cache) ── */
app.get('/api/data', async (req, res) => {
  try {
    // Serve from cache if valid
    if (isCacheValid()) {
      return res.json(cache.data);
    }

    // Lean query — returns plain JS object, skips Mongoose hydration
    const doc = await DataModel.findOne({}).lean();

    if (doc && doc.data) {
      // Populate cache
      cache.data = doc.data;
      cache.timestamp = Date.now();
      res.json(doc.data);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── SAVE DATA API (busts cache) ── */
app.post('/api/data', async (req, res) => {
  try {
    await DataModel.findOneAndUpdate({}, { data: req.body }, { upsert: true, new: true });

    // Bust cache so next GET serves fresh data
    bustCache();

    // Also warm the cache immediately
    cache.data = req.body;
    cache.timestamp = Date.now();

    res.json({ success: true, message: 'Data saved to MongoDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── CV UPLOAD API (Stores in MongoDB as Buffer) ── */
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

app.post('/api/upload-cv', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    await CVModel.findOneAndUpdate({}, {
      contentType: req.file.mimetype,
      data: req.file.buffer
    }, { upsert: true });
    res.json({ cvUrl: '/api/cv' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ── CV DOWNLOAD API ── */
app.get('/api/cv', async (req, res) => {
  try {
    const cv = await CVModel.findOne({}).lean();
    if (!cv || !cv.data) return res.status(404).send('No CV found');
    res.set('Content-Type', cv.contentType);
    res.set('Content-Disposition', 'inline; filename="Tonmoy_CV.pdf"');
    res.send(cv.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* ── EXPORT FOR VERCEL ── */
module.exports = app;

/* ── RUN SERVER LOCALLY IF NOT ON VERCEL ── */
if (require.main === module) {
  // Serve static files with caching headers
  app.use(express.static(__dirname, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
}
