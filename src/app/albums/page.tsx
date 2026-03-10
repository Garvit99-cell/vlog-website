"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Albums() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-blue-600 p-10">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-white mb-8">Albums Gallery</h1>

        {/* SEARCH BAR */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search albums..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl p-3 rounded-lg 
            bg-white/20 backdrop-blur-md 
            text-white placeholder-white/70 
            border border-white/30 
            focus:outline-none focus:ring-2 focus:ring-white/60
            shadow-md"
          />
        </div>

        {/* ALBUM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Album #{album.id}
              </h2>

              <p className="text-gray-600 text-sm">{album.title}</p>
            </div>
          ))}
        </div>

        {/* NO RESULTS */}
        {filteredAlbums.length === 0 && (
          <p className="text-white mt-10 text-lg">No albums found.</p>
        )}
      </div>
    </>
  );
}
