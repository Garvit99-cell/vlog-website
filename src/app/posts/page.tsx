"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Search Filter
  const filteredPosts = posts.filter(
    (post: any) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          All Blog Posts
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-3 mb-8 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPosts.slice(0, 20).map((post: any) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {post.title}
              </h2>

              {/* Body */}
              <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <p className="text-gray-700 mt-6">No posts found.</p>
        )}
      </div>
    </div>
  );
}
