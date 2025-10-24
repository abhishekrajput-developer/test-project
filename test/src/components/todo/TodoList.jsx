// import React from "react";
// import TodoItem from "./TodoItem";

// export default function TodoList({ todos, toggleComplete, deleteTodo }) {
//   if (todos.length === 0) return <p>No todos yet!</p>;

//   return (
//     <div className="mt-4">
//       {todos.map((todo) => (
//         <TodoItem
//           key={todo._id}
//           todo={todo}
//           toggleComplete={toggleComplete}
//           deleteTodo={deleteTodo}
//         />
//       ))}
//     </div>
//   );
// }


import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleComplete, deleteTodo }) {
  if (todos.length === 0)
    return <p className="text-gray-500 text-center mt-6">No todos yet! Add one above.</p>;

  return (
    <div className="mt-6 flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
