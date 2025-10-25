// wihout aws
// import React, { memo, useCallback } from "react";
// import { TableCell, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// function formatDate(date) {
//   if (!date) return "-";
//   const d = new Date(date);
//   return d.toLocaleString(); // simple, locale-aware
// }

// function TodoItem({ todo, toggleComplete, deleteTodo }) {
//   // ✅ Memoize handlers so each row doesn’t recreate them on every render
//   const handleToggle = useCallback(
//     (checked) => {
//       toggleComplete(todo._id, !!checked);
//     },
//     [todo._id, toggleComplete]
//   );

//   const handleDelete = useCallback(() => {
//     deleteTodo(todo._id);
//   }, [todo._id, deleteTodo]);

//   return (
//     <TableRow className="hover:bg-gray-50 transition-colors">
//       <TableCell className="text-center">
//         <Checkbox
//           checked={todo.completed}
//           onCheckedChange={handleToggle}
//           aria-label={`Mark "${todo.text}" as complete`}
//         />
//       </TableCell>

//       <TableCell
//         className={`text-gray-900 ${
//           todo.completed ? "line-through text-gray-400" : ""
//         }`}
//       >
//         {todo.text || "(Untitled)"}
//       </TableCell>

//       <TableCell>{formatDate(todo.createdAt)}</TableCell>

//       <TableCell className="text-center">
//         <Button
//           variant="destructive"
//           size="sm"
//           onClick={handleDelete}
//           aria-label={`Delete "${todo.text}"`}
//           className="flex items-center gap-1 mx-auto"
//         >
//           <Trash2 className="w-4 h-4" />
//           Delete
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// }

// // 🧠 memo() prevents re-render if props don’t change
// export default memo(TodoItem);



import React, { memo, useCallback } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Link as LinkIcon, File } from "lucide-react"; // ✅ Added icons

function formatDate(date) {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleString(); // simple, locale-aware
}

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  // ✅ Memoize handlers so each row doesn’t recreate them on every render
  const handleToggle = useCallback(
    (checked) => {
      toggleComplete(todo._id, !!checked);
    },
    [todo._id, toggleComplete]
  );

  const handleDelete = useCallback(() => {
    deleteTodo(todo._id);
  }, [todo._id, deleteTodo]);

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell className="text-center">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          aria-label={`Mark "${todo.text}" as complete`}
        />
      </TableCell>

      <TableCell
        className={`text-gray-900 ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.text || "(Untitled)"}
        {/* ✅ Display file link if available */}
        {todo.fileUrl && (
          <a
            href={todo.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline text-sm mt-1"
          >
            <LinkIcon className="w-3 h-3 mr-1" />
            {"Link" || todo.fileName}
          </a>
        )}
      </TableCell>

      <TableCell>{formatDate(todo.createdAt)}</TableCell>

      <TableCell className="text-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          aria-label={`Delete "${todo.text}"`}
          className="flex items-center gap-1 mx-auto"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

// 🧠 memo() prevents re-render if props don’t change
export default memo(TodoItem);