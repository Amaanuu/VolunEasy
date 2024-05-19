import express from "express";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// DELETE PROFILE
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You are not authenticated to delete others' account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Profile Deleted.");
  } catch (err) {
    next(err);
  }
});

// VIEW PROFILE
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

// UPDATE PROFILE
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You are not authenticated to edit others' account!"));
    }
    if (req.body.password) {
      try {
        const hash = await bcrypt.hash(req.body.password, 5);
        req.body.password = hash;
      } catch (err) {
        return next(createError(403, "Password error!"));
      }
    }
    await User.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json("Account has been successfully updated");
  } catch (err) {
    next(err);
  }
});

export default router;
