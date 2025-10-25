// wihout aws
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ArrowUpDown, Loader2 } from "lucide-react";
// import TodoItem from "./TodoItem";
// import { useTodos } from "@/hooks/useTodos";

// export default function TodoList({ todos: parentTodos, toggleComplete, deleteTodo }) {
//   const {
//     todos,
//     search,
//     setSearch,
//     sort,
//     toggleSort,
//     page,
//     totalPages,
//     nextPage,
//     prevPage,
//     loading,
//   } = useTodos({ parentTodos, limit: 5 }); // ✅ Pass parentTodos

//   return (
//     <div className="mt-8">
//       {/* 🔍 Search + Sort Controls */}
//       <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
//         <Input
//           placeholder="Search todos..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-xs"
//         />
//         <Button variant="outline" size="sm" onClick={toggleSort}>
//           Sort by Date ({sort})
//           <ArrowUpDown className="w-4 h-4 ml-2" />
//         </Button>
//       </div>

//       {/* 📋 Todo Table */}
//       <div className="rounded-md border overflow-hidden shadow-sm">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[60px] text-center">Done</TableHead>
//               <TableHead>Task</TableHead>
//               <TableHead>Date Added</TableHead>
//               <TableHead className="text-center w-[100px]">Action</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <td colSpan="4" className="text-center py-6 text-gray-500">
//                   <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
//                   Loading todos...
//                 </td>
//               </TableRow>
//             ) : todos.length > 0 ? (
//               todos.map((todo) => (
//                 <TodoItem
//                   key={todo._id}
//                   todo={todo}
//                   toggleComplete={toggleComplete}
//                   deleteTodo={deleteTodo}
//                 />
//               ))
//             ) : (
//               <TableRow>
//                 <td colSpan="4" className="text-center py-6 text-gray-500">
//                   No todos found for "<span className="font-semibold">{search}</span>"
//                 </td>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* 📄 Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={prevPage}
//           disabled={page === 1 || loading}
//         >
//           Previous
//         </Button>
//         <p className="text-sm text-gray-600">
//           Page <span className="font-medium">{page}</span> of{" "}
//           <span className="font-medium">{totalPages}</span>
//         </p>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={nextPage}
//           disabled={page === totalPages || loading}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }





// src/components/todo/TodoList.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Loader2 } from "lucide-react";
import TodoItem from "./TodoItem";
import { useTodos } from "@/hooks/useTodos";

export default function TodoList({
  todos: parentTodos,
  toggleComplete,
  deleteTodo,
}) {
  const {
    todos,
    search,
    setSearch,
    sort,
    toggleSort,
    page,
    totalPages,
    nextPage,
    prevPage,
    loading,
  } = useTodos({ parentTodos, limit: 5 }); // ✅ Pass parentTodos

  return (
    <div className="mt-8">
      {/* 🔍 Search + Sort Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <Input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button variant="outline" size="sm" onClick={toggleSort}>
          Sort by Date ({sort})
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* 📋 Todo Table */}
      <div className="rounded-md border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">Done</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-center w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                  Loading todos...
                </td>
              </TableRow>
            ) : todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              ))
            ) : (
              <TableRow>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No todos found for{" "}
                  <span className="font-semibold">"{search}"</span>
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 📄 Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={page === 1 || loading}
        >
          Previous
        </Button>
        <p className="text-sm text-gray-600">
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={page === totalPages || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
