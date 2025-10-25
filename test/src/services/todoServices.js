// import { api } from "../lib/api.js";

// // ✅ Fetch todos with server-side filtering, sorting, and pagination
// export const getTodos = async ({ search = "", sort = "desc", page = 1, limit = 5 } = {}) => {
//   const { data } = await api.get("/todos", {
//     params: { search, sort, page, limit },
//   });
//   return data; // { todos, total, page, totalPages }
// };

// // ✅ Create a new todo
// export const createTodo = async (text) => {
//   const { data } = await api.post("/todos", { text, completed: false });
//   return data;
// };

// // ✅ Toggle completion
// export const updateTodo = async (id) => {
//   const { data } = await api.put(`/todos/${id}`);
//   return data;
// };

// // ✅ Delete todo
// export const deleteTodo = async (id) => {
//   const { data } = await api.delete(`/todos/${id}`);
//   return data;
// };




// import { api } from "../lib/api.js";


// export const getTodos = async ({ search = "", sort = "desc", page = 1, limit = 5 } = {}) => {
// const { data } = await api.get("/todos", {
// params: { search, sort, page, limit },
// });
// return data;
// };


// export const createTodo = async (text, fileUrl) => {
// const { data } = await api.post("/todos", { text, fileUrl, completed: false });
// return data;
// };


// export const updateTodo = async (id) => {
// const { data } = await api.put(`/todos/${id}`);
// return data;
// };


// export const deleteTodo = async (id) => {
// const { data } = await api.delete(`/todos/${id}`);
// return data;
// };


// // New: request a presigned URL from backend
// export const getPresignedUrl = async (filename, contentType) => {
// const { data } = await api.get('/todos/presign', { params: { filename, contentType } });
// // data: { uploadUrl, fileUrl }
// return data;
// };


import { api } from "../lib/api.js";

// ✅ New service for file upload
export const uploadTodoFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 'file' must match the field name in multer setup (`upload.single("file")`)
  const { data } = await api.post("/todos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Important for file uploads
    },
  });
  return data;
};

// ✅ Fetch todos with server-side filtering, sorting, and pagination
export const getTodos = async ({
  search = "",
  sort = "desc",
  page = 1,
  limit = 5,
} = {}) => {
  const { data } = await api.get("/todos", {
    params: { search, sort, page, limit },
  });
  return data; // { todos, total, page, totalPages }
};

// ✅ Create a new todo - MODIFIED
export const createTodo = async (text, fileUrl = null, fileName = null) => {
  const { data } = await api.post("/todos", {
    text,
    completed: false,
    fileUrl, // ✅ Pass fileUrl
    fileName, // ✅ Pass fileName
  });
  return data;
};

// ✅ Toggle completion
export const updateTodo = async (id) => {
  const { data } = await api.put(`/todos/${id}`);
  return data;
};

// ✅ Delete todo
export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};