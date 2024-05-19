// auth.controller.js
import express from "express";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { passwordStrength } from "check-password-strength";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res, next) => {
  const { username, password, email, occupation, address } = req.body;
  if (!password || !username || !email || !occupation || !address) {
    return next(createError(400, "All fields are required"));
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(createError(400, "Username already exists"));
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(createError(400, "Email already exists"));
    }
    const isWeakPassword = passwordStrength(password) === "Weak";
    if (isWeakPassword) {
      return next(createError(400, "Password is too weak"));
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hash,
      email,
      occupation,
      address,
    });
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return next(createError(401, "Incorrect password"));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("accessToken", token, { httpOnly: true }).send("Logged in successfully.");
  } catch (err) {
    next(err);
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken").send("Logged out successfully.");
});

export default router;
