import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    fileUrl: { type: String, default: null }, // ✅ New field for file URL
    fileName: { type: String, default: null },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
