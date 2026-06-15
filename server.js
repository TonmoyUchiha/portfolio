const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (the uploads folder and the current directory)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname)); // To serve index.html

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage: storage });

const dataFilePath = path.join(__dirname, 'data.json');

app.get('/api/data', (req, res) => {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    res.json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'No data found' });
  }
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  res.json({ success: true, message: 'Data saved successfully' });
});

app.post('/api/upload-cv', upload.single('cv'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const cvUrl = '/uploads/' + req.file.filename;
  res.json({ cvUrl: cvUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
