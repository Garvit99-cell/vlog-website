"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.company.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-200 p-10">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Users</h1>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl p-3 mb-10 rounded-lg bg-white text-gray-800 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* USERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">{user.name}</h2>

                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>

              <p className="text-blue-600 text-sm">{user.company.name}</p>
            </div>
          ))}
        </div>

        {/* NO RESULT */}
        {filteredUsers.length === 0 && (
          <p className="mt-8 text-gray-600">No users found.</p>
        )}
      </div>
    </>
  );
}
