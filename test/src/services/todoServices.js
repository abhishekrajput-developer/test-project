
// // axios base uri setup
// import { api } from "@/lib/api.js";

// export const getTodos = async () => {
//   const response = await api.get("/todos");
//   return response.data;
// };

// export const createTodo = async (text) => {
//   const response = await api.post("/todos", { text });
//   return response.data;
// };

// export const updateTodo = async (id) => {
//   const response = await api.put(`/todos/${id}`);
//   return response.data;
// };

// export const deleteTodo = async (id) => {
//   const response = await api.delete(`/todos/${id}`);
//   return response.data;
// };


import { api } from "../lib/api.js";

// ✅ Fetch todos with server-side filtering, sorting, and pagination
export const getTodos = async ({ search = "", sort = "desc", page = 1, limit = 5 } = {}) => {
  const { data } = await api.get("/todos", {
    params: { search, sort, page, limit },
  });
  return data; // { todos, total, page, totalPages }
};

// ✅ Create a new todo
export const createTodo = async (text) => {
  const { data } = await api.post("/todos", { text, completed: false });
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
