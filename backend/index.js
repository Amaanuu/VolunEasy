import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import volunRoute from "./routes/volun.js";
import eventRoute from "./routes/event.js";
import uploadRoute from "./routes/upload.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// MongoDB connection
const connect = async () => {
  try {
    const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/mydatabase";
    await mongoose.connect(connectionString);
    console.log("Successfully Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

// Middleware
app.use(cors({ origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/volun", volunRoute);
app.use("/api/event", eventRoute);
app.use('/api', uploadRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Unexpected error has occurred";
  // console.error("Error:", err);
  console.log("#################")
  console.log(err.message)
  console.log("#################")
  return res.status(errorStatus).send(errorMessage);
});

// Start the server
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}`);
});
