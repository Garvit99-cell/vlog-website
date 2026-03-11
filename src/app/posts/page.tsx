"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // SEARCH FILTER
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase()),
  );

  // PAGINATION
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // ADD POST
  const addPost = () => {
    if (!title.trim() || !body.trim()) return;

    const normalizedTitle = title.trim().toLowerCase();

    const duplicate = posts.find(
      (post) => post.title.trim().toLowerCase() === normalizedTitle,
    );

    if (duplicate) {
      setError("Title already exists. Please choose another title.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setBody("");
    setError("");
  };

  // DELETE
  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // EDIT
  const editPost = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UPDATE
  const updatePost = () => {
    const normalizedTitle = title.trim().toLowerCase();

    const duplicate = posts.find(
      (post) =>
        post.title.trim().toLowerCase() === normalizedTitle &&
        post.id !== editingId,
    );

    if (duplicate) {
      setError("Title already exists. Please choose another title.");
      return;
    }

    setPosts(
      posts.map((post) =>
        post.id === editingId
          ? { ...post, title: title.trim(), body: body.trim() }
          : post,
      ),
    );

    setEditingId(null);
    setTitle("");
    setBody("");
    setError("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Posts Manager
          </h1>

          {/* ADD POST FORM */}

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingId ? "Edit Post" : "Add New Post"}
            </h2>

            <label className="text-gray-800 font-semibold block mb-1">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              maxLength={80}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg mb-2 text-gray-900 border border-gray-300"
            />

            <p className="text-gray-700 text-sm mb-3">
              {title.length}/80 characters
            </p>

            <label className="text-gray-800 font-semibold block mb-1">
              Post Description
            </label>

            <textarea
              placeholder="Write post description..."
              value={body}
              maxLength={300}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 rounded-lg mb-2 text-gray-900 border border-gray-300 h-28"
            />

            <p className="text-gray-700 text-sm mb-3">
              {body.length}/300 characters
            </p>

            {error && (
              <p className="text-red-600 bg-red-100 p-2 rounded mb-3">
                {error}
              </p>
            )}

            {editingId ? (
              <button
                onClick={updatePost}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Update Post
              </button>
            ) : (
              <button
                onClick={addPost}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Add Post
              </button>
            )}
          </div>

          {/* SEARCH BAR */}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-3 rounded-lg text-gray-900 placeholder-gray-600 border border-gray-300"
            />
          </div>

          {/* POSTS */}

          <div className="space-y-6">
            {currentPosts.length === 0 ? (
              <div className="bg-white text-center p-10 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-gray-800">
                  No Posts Found
                </h2>
                <p className="text-gray-600 mt-2">
                  Try searching with a different title or description.
                </p>
              </div>
            ) : (
              currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
                >
                  <p className="mb-2 text-gray-900">
                    <span className="font-semibold text-gray-700">Title:</span>{" "}
                    {post.title}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold text-gray-700">
                      Description:
                    </span>{" "}
                    {post.body}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => editPost(post)}
                      className="bg-yellow-400 px-4 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PAGINATION */}

          <div className="flex justify-center flex-wrap gap-3 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-white text-blue-600"
                    : "bg-blue-400 text-white"
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
