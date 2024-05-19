// controller.js
import express from "express";
import multer from "multer";
import createError from "../utils/createError.js";
import volun from "../models/volun.model.js";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  // Your token verification logic here
  next();
};


  // Multer configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploaded-images'); // the destination folder where files will be uploaded
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Create volun
  // router.post("/", verifyToken, async (req, res, next) => {
  router.post("/", upload.single("image"), async (req, res, next) => {
    const { title, desc } = req.body;
    const image = req.file; // Retrieve the uploaded file
  
    try {
      // Validate if title, desc, and image are provided
      if (!title || !desc || !image) {
        throw createError(400, "Title, description, and image are required");
      }
  
      const newvolun = new volun({
        title,
        desc,
        image: image.path, // Save the path to the image in the database
      });
  
      const savedvolun = await newvolun.save();
      res.status(201).json(savedvolun);
    } catch (err) {
      next(err);
    }
  });
  
  

// Update volun
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const volun = await volun.findById(req.params.id);

    if (volun.userId !== req.userId) {
      return next(createError(403, "You can't update another person's volun"));
    }

    await volun.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("volun has been updated");
  } catch (err) {
    return next(createError(500, "volun not updated"));
  }
});

// Delete volun
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const volun = await volun.findById(req.params.id);
    if (volun.userId !== req.userId) {
      return next(createError(403, "You can delete only your volun!"));
    }

    await volun.findByIdAndDelete(req.params.id);
    res.status(200).send("volun has been deleted!");
  } catch (err) {
    next(err);
  }
});

// Get volun by ID
router.get("/:id", async (req, res, next) => {
  try {
    const volun = await volun.findById(req.params.id);
    if (!volun) {
      return next(createError(404, "volun not found!"));
    }
    res.status(200).json(volun);
  } catch (err) {
    next(err);
  }
});

// Get all voluns
router.get("/", async (req, res) => {
  try {
    const voluns = await volun.find();
    res.status(200).json(voluns);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
