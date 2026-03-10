"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Todos() {
  const [todos, setTodos] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.slice(0, 30)));
  }, []);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 py-12">
        {/* CENTER CONTAINER */}
        <div className="max-w-4xl mx-auto px-6">
          {/* TITLE */}
          <h1 className="text-4xl font-bold text-white mb-6">Todos</h1>

          {/* SEARCH BAR */}
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded-lg
              bg-white/20
              backdrop-blur-md
              border border-white/30
              text-white
              placeholder-white/70
              focus:outline-none
              focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* TODO LIST */}
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-xl p-4 shadow-lg flex justify-between items-center hover:scale-[1.02] transition"
              >
                <p className="text-gray-800 font-medium">{todo.title}</p>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold text-white ${
                    todo.completed ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
