const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://tonmoyuchiha_db_user:lFKz7iaRDeTOqEOo@cluster0.vo9nqo4.mongodb.net/portfolio?appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// MONGOOSE MODELS
const DataSchema = new mongoose.Schema({ data: Object }, { strict: false });
const DataModel = mongoose.models.PortfolioData || mongoose.model('PortfolioData', DataSchema);

const CVSchema = new mongoose.Schema({ contentType: String, data: Buffer });
const CVModel = mongoose.models.CV || mongoose.model('CV', CVSchema);

// GET DATA API
app.get('/api/data', async (req, res) => {
  try {
    const doc = await DataModel.findOne({});
    if (doc && doc.data) {
      res.json(doc.data);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE DATA API
app.post('/api/data', async (req, res) => {
  try {
    await DataModel.findOneAndUpdate({}, { data: req.body }, { upsert: true, new: true });
    res.json({ success: true, message: 'Data saved to MongoDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CV UPLOAD API (Stores in MongoDB as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// CV DOWNLOAD API
app.get('/api/cv', async (req, res) => {
  try {
    const cv = await CVModel.findOne({});
    if (!cv || !cv.data) return res.status(404).send('No CV found');
    res.set('Content-Type', cv.contentType);
    res.send(cv.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// EXPORT FOR VERCEL
module.exports = app;

// RUN SERVER LOCALLY IF NOT ON VERCEL
if (require.main === module) {
  app.use(express.static(__dirname));
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
