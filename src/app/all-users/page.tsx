"use client";

import { users } from "../../data/users";

export default function AllUsers() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Dummy Users</h1>

      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p>{user.email}</p>
            <p>Password: {user.password}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
