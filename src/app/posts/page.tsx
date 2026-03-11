"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const addPost = () => {
    if (!title || !body) return;

    const newPost = {
      id: posts.length + 1,
      title,
      body,
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setBody("");
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const editPost = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePost = () => {
    setPosts(
      posts.map((post) =>
        post.id === editingId ? { ...post, title, body } : post,
      ),
    );

    setEditingId(null);
    setTitle("");
    setBody("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* PAGE TITLE */}
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Posts Manager
          </h1>

          {/* FORM CARD */}

          <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-10 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingId ? "Edit Post" : "Add New Post"}
            </h2>

            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg mb-4 text-black focus:outline-none"
            />

            <textarea
              placeholder="Write post description..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 rounded-lg mb-4 text-black focus:outline-none"
            />

            {editingId ? (
              <button
                onClick={updatePost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Update Post
              </button>
            ) : (
              <button
                onClick={addPost}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Add Post
              </button>
            )}
          </div>

          {/* POSTS LIST */}

          <div className="space-y-6">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <h2 className="text-lg font-bold text-gray-800">
                  {post.title}
                </h2>

                <p className="text-gray-600 mt-2">{post.body}</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => editPost(post)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          <div className="flex justify-center gap-3 mt-10 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === i + 1
                    ? "bg-white text-blue-600"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
