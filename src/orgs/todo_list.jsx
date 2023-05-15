import React from "react";

export const TodoList = ({ todos }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="py-4 text-3xl font-bold">List of todos:</div>
      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {todos.map((todo, index) => (
          <li key={index} className="mb-4">
            <div className="font-bold">{todo.name}</div>
            <div>{todo.about}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
