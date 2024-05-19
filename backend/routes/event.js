// controller.js
import express from "express";
import multer from "multer";
import createError from "../utils/createError.js";
import event from "../models/event.model.js";

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
  
  // Create event
  // router.post("/", verifyToken, async (req, res, next) => {
  router.post("/", upload.single("image"), async (req, res, next) => {
    const { title, desc } = req.body;
    const image = req.file; // Retrieve the uploaded file
  
    try {
      // Validate if title, desc, and image are provided
      if (!title || !desc || !image) {
        throw createError(400, "Title, description, and image are required");
      }
  
      const newevent = new event({
        title,
        desc,
        image: image.path, // Save the path to the image in the database
      });
  
      const savedevent = await newevent.save();
      res.status(201).json(savedevent);
    } catch (err) {
      next(err);
    }
  });
  
  

// Update event
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const event = await event.findById(req.params.id);

    if (event.userId !== req.userId) {
      return next(createError(403, "You can't update another person's event"));
    }

    await event.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("event has been updated");
  } catch (err) {
    return next(createError(500, "event not updated"));
  }
});

// Delete event
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const event = await event.findById(req.params.id);
    if (event.userId !== req.userId) {
      return next(createError(403, "You can delete only your event!"));
    }

    await event.findByIdAndDelete(req.params.id);
    res.status(200).send("event has been deleted!");
  } catch (err) {
    next(err);
  }
});

// Get event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const event = await event.findById(req.params.id);
    if (!event) {
      return next(createError(404, "event not found!"));
    }
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
