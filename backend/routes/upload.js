import express from 'express';
import multer from 'multer';

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploaded-images/'); //  the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for storing
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB (adjust as needed)
});

// POST route for file upload
router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    // Access the uploaded file via req.file
    console.log(req.file);
    res.send('File uploaded successfully');
  } catch (err) {
    // Handle any errors that occur during file upload
    next(err);
  }
});

// Error handling middleware for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error (e.g., file size exceeds limit)
    res.status(400).json({ error: 'File upload error', message: err.message });
  } else {
    // Other unexpected errors
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

export default router;
