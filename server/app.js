import express from "express";
import cors from "cors";
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
