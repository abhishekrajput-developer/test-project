// todoController.js (Modified)
import { Todo } from "../models/todoModel.js";
import { sheets } from "../config/googleSheet.js";
import { buildSearchQuery } from "../utils/todoUtils.js";

import { upload, deleteFileFromS3 } from "../utils/s3-service.js";
export { upload };

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  res.json({
    message: "File uploaded successfully",
    fileUrl: req.file.location,
    fileName: req.file.key,
  });
};

// ✅ GET all todos with search, sort, pagination
export const getTodos = async (req, res) => {
  try {
    const {
      search = "",
      sort = "desc",
      page = 1,
      limit = 5,
    } = req.query;
    const query = buildSearchQuery(search);
    console.log("Search regex query:", query.text);
    const sortOrder = sort === "asc" ? 1 : -1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const [todos, total] = await Promise.all([
      Todo.find(query)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limitNum),
      Todo.countDocuments(query),
    ]);

    res.json({
      todos,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE a new todo (sync to Google Sheet) - MODIFIED
export const createTodo = async (req, res) => {
  try {
    const { text, completed, fileUrl, fileName } = req.body; // ✅ Accept fileUrl and fileName
    const todo = await Todo.create({ text, completed, fileUrl, fileName }); // ✅ Store fileUrl and fileName
    const date = new Date().toLocaleString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A:E", // ✅ Expanded range for fileUrl
      valueInputOption: "RAW",
      requestBody: {
        values: [[todo._id.toString(), text, date, todo.completed ? "TRUE" : "FALSE", fileUrl || ""]], // ✅ Add fileUrl to sheet
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE Todo completion
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A:E", // ✅ Expanded range
    });

    const rows = readRes.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) return res.status(404).json({ message: "Not found in sheet" });

    // ✅ Update logic to include fileUrl, which remains unchanged on completion toggle
    const sheetRowToUpdate = [
      rows[rowIndex][0],
      rows[rowIndex][1],
      rows[rowIndex][2],
      todo.completed ? "TRUE" : "FALSE",
      rows[rowIndex][4] || "", // Keep existing fileUrl
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `Sheet1!A${rowIndex + 1}:E${rowIndex + 1}`, // ✅ Expanded range
      valueInputOption: "RAW",
      requestBody: {
        values: [sheetRowToUpdate],
      },
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE Todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id); // Find first to get fileUrl
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // ✅ If there's a file, delete it from S3 using the new service function
    if (todo.fileName) {
      await deleteFileFromS3(todo.fileName);
    }

    await Todo.findByIdAndDelete(id);

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A:E", // ✅ Expanded range
    });

    const rows = readRes.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1)
      return res.status(404).json({ message: "Todo not found in Google Sheet" });

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: { sheetId: 0, dimension: "ROWS", startIndex: rowIndex, endIndex: rowIndex + 1 },
            },
          },
        ],
      },
    });

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};