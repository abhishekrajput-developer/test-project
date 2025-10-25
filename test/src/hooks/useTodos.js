// src/hooks/useTodos.js
import { useState, useEffect, useCallback } from "react";
import { getTodos } from "@/services/todoServices";
import toast from "react-hot-toast";

export function useTodos({ parentTodos = [], initialSort = "desc", limit = 5 }) {
  const [todos, setTodos] = useState(parentTodos || []);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch todos with backend search/sort/pagination
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTodos({ search, sort, page, limit });
      setTodos(data.todos || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  }, [search, sort, page, limit]);

  // ✅ Debounced backend fetching
  useEffect(() => {
    const id = setTimeout(() => {
      fetchTodos();
    }, 600);
    return () => clearTimeout(id);
  }, [fetchTodos]);

  // ✅ Keep todos synced when parent adds/deletes one
//   useEffect(() => {
//     if (parentTodos && parentTodos.length > 0) {
//       setTodos(parentTodos);
//     }
//   }, [parentTodos]);

  useEffect(() => {
    setTodos(parentTodos || []);
  }, [parentTodos]);

  // ✅ Pagination & Sorting helpers
  const toggleSort = useCallback(() => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const nextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return {
    todos,
    setTodos,
    search,
    setSearch,
    sort,
    toggleSort,
    page,
    totalPages,
    nextPage,
    prevPage,
    loading,
  };
}
