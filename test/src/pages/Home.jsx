// import React, { useEffect, useState } from "react";
// import TodoForm from "@/components/form/TodoForm";
// import TodoList from "@/components/todo/TodoList";
// import {
//   getTodos,
//   createTodo,
//   updateTodo,
//   deleteTodo,
// } from "../services/todoServices.js";
// import toast from "react-hot-toast";

// export default function Home() {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTodos = async () => {
//     try {
//       const data = await getTodos();
//       setTodos(data);
//       toast.success("Todo Fetched successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetched todo.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const addTodoHandler = async (text) => {
//     try {
//       const newTodo = await createTodo(text);
//       setTodos([newTodo, ...todos]);
//       toast.success("Todo added successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add todo.");
//     }
//   };

//   const toggleCompleteHandler = async (id) => {
//     try {
//       const updated = await updateTodo(id);
//       setTodos(todos.map((t) => (t._id === id ? updated : t)));
//       toast.success("Todo updated!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update todo.");
//     }
//   };

//   const deleteTodoHandler = async (id) => {
//     try {
//       await deleteTodo(id);
//       setTodos(todos.filter((t) => t._id !== id));
//       toast.error("todo deleted successfully.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete todo.");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4">
//       <h1 className="text-2xl font-bold mb-4">Todo List</h1>
//       <TodoForm addTodo={addTodoHandler} />
//       <TodoList
//         todos={todos}
//         toggleComplete={toggleCompleteHandler}
//         deleteTodo={deleteTodoHandler}
//       />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import TodoForm from "@/components/form/TodoForm";
import TodoList from "@/components/todo/TodoList";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoServices.js";
import toast from "react-hot-toast";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
      toast.success("Todos fetched successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoHandler = async (text) => {
    try {
      const newTodo = await createTodo(text);
      setTodos([newTodo, ...todos]);
      toast.success("Todo added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add todo.");
    }
  };

  const toggleCompleteHandler = async (id) => {
    try {
      const updated = await updateTodo(id);
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
      toast.success("Todo updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update todo.");
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Todo deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete todo.");
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">My Todo List</h1>
      <TodoForm addTodo={addTodoHandler} />
      <TodoList
        todos={todos}
        toggleComplete={toggleCompleteHandler}
        deleteTodo={deleteTodoHandler}
      />
    </div>
  );
}
