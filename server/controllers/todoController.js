import { Todo } from "../models/todoModel.js";
import {sheets} from "../config/googleSheet.js";
// GET all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new todo
// export const createTodo = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const todo = await Todo.create({ text });
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    // 1️⃣ Save todo in MongoDB
    const todo = await Todo.create({ text });

    // 2️⃣ Append the same todo to Google Sheet
    const date = new Date().toLocaleString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A:C", // Make sure your Google Sheet has at least 3 columns
      valueInputOption: "RAW",
      requestBody: {
        values: [[todo._id.toString(), text, date]],
      },
    });

    // 3️⃣ Return the created todo
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: error.message });
  }
};


// UPDATE todo (complete/uncomplete)
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
