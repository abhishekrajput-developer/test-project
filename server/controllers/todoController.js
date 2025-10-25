// import { Todo } from "../models/todoModel.js";
// import {sheets} from "../config/googleSheet.js";
// // GET all todos
// export const getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find().sort({ createdAt: -1 });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const createTodo = async (req, res) => {
//   try {
//     const { text, completed } = req.body;

//     // 1️⃣ Save todo in MongoDB
//     const todo = await Todo.create({ text, completed });

//     // 2️⃣ Append the same todo to Google Sheet
//     const date = new Date().toLocaleString();

//     await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: "Sheet1!A:D", 
//       valueInputOption: "RAW",
//       requestBody: {
//         values: [[todo._id.toString(), text, date, todo.completed ? "TRUE" : "FALSE"]],
//       },
//     });

//     // 3️⃣ Return the created todo
//     res.status(201).json(todo);
//   } catch (error) {
//     console.error("Error creating todo:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findById(id);

//     if (!todo) return res.status(404).json({ message: "Todo not found" });

//     // 1️⃣ Toggle completion
//     todo.completed = !todo.completed;
//     await todo.save();

//     // 2️⃣ Read all rows from Google Sheet
//     const readRes = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: "Sheet1!A:D",
//     });

//     const rows = readRes.data.values || [];

//     // 3️⃣ Find the row with this todo._id
//     const rowIndex = rows.findIndex((r) => r[0] === id);
//     if (rowIndex === -1)
//       return res.status(404).json({ message: "Todo not found in sheet" });

//     // 4️⃣ Update that row’s completed value
//     await sheets.spreadsheets.values.update({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: `Sheet1!A${rowIndex + 1}:D${rowIndex + 1}`,
//       valueInputOption: "RAW",
//       requestBody: {
//         values: [
//           [
//             rows[rowIndex][0], // ID
//             rows[rowIndex][1], // Text
//             rows[rowIndex][2], // Date
//             todo.completed ? "TRUE" : "FALSE", // Updated status
//           ],
//         ],
//       },
//     });

//     res.json(todo);
//   } catch (error) {
//     console.error("Error updating todo:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🔴 DELETE todo (remove from MongoDB + Google Sheet)
// export const deleteTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findByIdAndDelete(id);
//     if (!todo) return res.status(404).json({ message: "Todo not found" });

//     // 1️⃣ Read all rows from Google Sheet
//     const readRes = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: "Sheet1!A:D",
//     });

//     const rows = readRes.data.values || [];

//     // 2️⃣ Find the row with this todo._id
//     const rowIndex = rows.findIndex((r) => r[0] === id);
//     if (rowIndex === -1)
//       return res
//         .status(404)
//         .json({ message: "Todo not found in Google Sheet" });

//     // 3️⃣ Delete the row using batchUpdate
//     await sheets.spreadsheets.batchUpdate({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       requestBody: {
//         requests: [
//           {
//             deleteDimension: {
//               range: {
//                 sheetId: 0, // usually 0 for the first sheet
//                 dimension: "ROWS",
//                 startIndex: rowIndex,
//                 endIndex: rowIndex + 1,
//               },
//             },
//           },
//         ],
//       },
//     });

//     res.json({ message: "Todo deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting todo:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


// import { Todo } from "../models/todoModel.js";
// import { sheets } from "../config/googleSheet.js";

// export const getTodos = async (req, res) => {
//   try {
//     const {
//       search = "",
//       sort = "desc",
//       page = 1,
//       limit = 5,
//     } = req.query;

//     // 🧹 Clean and normalize search input
//     const escapeRegex = (str) =>
//       str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex special chars

//     const normalizeSpaces = (str) =>
//       str.replace(/\s+/g, " ").trim(); // collapse multiple spaces

//     const query = {};

//     if (search.trim()) {
//       const safeSearch = escapeRegex(normalizeSpaces(search));
//       query.text = { $regex: safeSearch, $options: "i" };
//     }

//     const sortOrder = sort === "asc" ? 1 : -1;
//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const limitNum = parseInt(limit);

//     const [todos, total] = await Promise.all([
//       Todo.find(query)
//         .sort({ createdAt: sortOrder })
//         .skip(skip)
//         .limit(limitNum),
//       Todo.countDocuments(query),
//     ]);

//     res.json({
//       todos,
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / limitNum),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import { Todo } from "../models/todoModel.js";
import { sheets } from "../config/googleSheet.js";
import { buildSearchQuery } from "../utils/todoUtils.js";  // ✅ import utility

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



// ✅ CREATE a new todo (sync to Google Sheet)
export const createTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = await Todo.create({ text, completed });
    const date = new Date().toLocaleString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [[todo._id.toString(), text, date, todo.completed ? "TRUE" : "FALSE"]],
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
      range: "Sheet1!A:D",
    });

    const rows = readRes.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) return res.status(404).json({ message: "Not found in sheet" });

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `Sheet1!A${rowIndex + 1}:D${rowIndex + 1}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [rows[rowIndex][0], rows[rowIndex][1], rows[rowIndex][2], todo.completed ? "TRUE" : "FALSE"],
        ],
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
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A:D",
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
