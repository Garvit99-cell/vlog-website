"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  // Search filter
  const filteredAlbums = albums.filter((album: any) =>
    album.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-300">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-pink-700 mb-6">
          Albums Gallery
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search albums..."
          className="w-full p-3 mb-8 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Albums Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {filteredAlbums.slice(0, 20).map((album: any) => (
            <div
              key={album.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Album #{album.id}
              </h2>

              <p className="text-gray-600">{album.title}</p>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAlbums.length === 0 && (
          <p className="text-gray-700 mt-6">No albums found.</p>
        )}
      </div>
    </div>
  );
}
