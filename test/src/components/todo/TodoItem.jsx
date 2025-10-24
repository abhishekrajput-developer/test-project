// import React from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

// export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
//   return (
//     <div className="flex justify-between items-center p-2 border rounded mb-2">
//       <div className="flex items-center gap-2">
//         <Checkbox
//           checked={todo.completed}
//           onCheckedChange={() => toggleComplete(todo._id)}
//         />
//         <span className={todo.completed ? "line-through text-gray-400" : ""}>
//           {todo.text}
//         </span>
//       </div>
//       <Button
//         variant="destructive"
//         size="sm"
//         onClick={() => deleteTodo(todo._id)}
//       >
//         Delete
//       </Button>
//     </div>
//   );
// }

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 mb-3 hover:bg-gray-100 transition-all">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleComplete(todo._id)}
        />
        <span className={`text-gray-900 ${todo.completed ? "line-through text-gray-400" : ""}`}>
          {todo.text}
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteTodo(todo._id)}
      >
        Delete
      </Button>
    </div>
  );
}
