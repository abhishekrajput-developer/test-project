import express from "express";
import cors from "cors";
import multer from "multer"; 
import { connectDB } from "./config/db.js";
import todoRoute from "./routes/todoRoute.js";
import dotenv from "dotenv";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.use("/api/todos", todoRoute);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // An unknown error occurred when uploading.
    return res.status(500).json({ message: err.message });
  }
  next();
});

// Connect DB and start server

async function startServer() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
