import express from 'express';
import upload from '../config/upload.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Upload poster image
router.post('/poster', auth, upload.single('poster'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ 
      message: 'File uploaded successfully', 
      url: fileUrl 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Upload profile picture
router.post('/profile', auth, upload.single('profile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ 
      message: 'Profile picture uploaded successfully', 
      url: fileUrl 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

export default router;
