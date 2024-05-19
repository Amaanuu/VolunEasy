// controller.js
import express from "express";
import multer from "multer";
import createError from "../utils/createError.js";
import Recipe from "../models/recipe.model.js";

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
  
  // Create recipe
  // router.post("/", verifyToken, async (req, res, next) => {
  router.post("/", upload.single("image"), async (req, res, next) => {
    const { title, desc } = req.body;
    const image = req.file; // Retrieve the uploaded file
  
    try {
      // Validate if title, desc, and image are provided
      if (!title || !desc || !image) {
        throw createError(400, "Title, description, and image are required");
      }
  
      const newRecipe = new Recipe({
        title,
        desc,
        image: image.path, // Save the path to the image in the database
      });
  
      const savedRecipe = await newRecipe.save();
      res.status(201).json(savedRecipe);
    } catch (err) {
      next(err);
    }
  });
  
  

// Update recipe
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const recipe = await recipe.findById(req.params.id);

    if (recipe.userId !== req.userId) {
      return next(createError(403, "You can't update another person's recipe"));
    }

    await recipe.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Recipe has been updated");
  } catch (err) {
    return next(createError(500, "Recipe not updated"));
  }
});

// Delete recipe
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const recipe = await recipe.findById(req.params.id);
    if (recipe.userId !== req.userId) {
      return next(createError(403, "You can delete only your recipe!"));
    }

    await recipe.findByIdAndDelete(req.params.id);
    res.status(200).send("Recipe has been deleted!");
  } catch (err) {
    next(err);
  }
});

// Get recipe by ID
router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await recipe.findById(req.params.id);
    if (!recipe) {
      return next(createError(404, "Recipe not found!"));
    }
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
