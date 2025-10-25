import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  upload, // ✅ Import upload middleware
  uploadFile, // ✅ Import uploadFile controller
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
// ✅ New route for file upload - 'file' is the field name in the form
router.post("/upload", upload.single("file"), uploadFile);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;