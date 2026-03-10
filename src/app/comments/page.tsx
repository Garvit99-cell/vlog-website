"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const commentsPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  // Search filter
  const filtered = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(search.toLowerCase()) ||
      comment.body.toLowerCase().includes(search.toLowerCase()) ||
      comment.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination
  const start = (page - 1) * commentsPerPage;
  const paginatedComments = filtered.slice(start, start + commentsPerPage);
  const totalPages = Math.ceil(filtered.length / commentsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Comments</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search comments..."
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Comments */}
        <div className="space-y-6">
          {paginatedComments.map((comment: any) => (
            <div
              key={comment.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              {/* User */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full font-bold">
                  {comment.email[0].toUpperCase()}
                </div>

                <div>
                  <p className="font-bold text-gray-900">{comment.name}</p>

                  <p className="text-sm text-purple-600">{comment.email}</p>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-3">{comment.body}</p>

              {/* Like Button */}
              <button className="text-red-500 font-semibold hover:scale-110 transition">
                ❤️ Like
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-3 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded-lg ${
                page === num ? "bg-purple-600 text-white" : "bg-white border"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
