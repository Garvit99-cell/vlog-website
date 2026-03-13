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

  // FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching posts.");
      }
    };

    fetchPosts();
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
  const addPost = async () => {
    try {
      if (!title.trim() || !body.trim()) {
        setError("Post cannot be empty.");
        return;
      }

      const normalizedTitle = title.trim().toLowerCase();

      const duplicate = posts.find(
        (post) => post.title.trim().toLowerCase() === normalizedTitle,
      );

      if (duplicate) {
        setError("Title already exists. Please choose another title.");
        return;
      }

      const newPost = {
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      };

      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error("Failed to create post.");
      }

      const data = await res.json();

      setPosts([{ ...data, id: Date.now() }, ...posts]);

      setTitle("");
      setBody("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Something went wrong while adding the post.");
    }
  };

  // DELETE POST
  const deletePost = async (id: number) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete post.");
      }

      setPosts(posts.filter((post) => post.id !== id));
    } catch (err: any) {
      setError(err.message || "Something went wrong while deleting the post.");
    }
  };

  // EDIT
  const editPost = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UPDATE POST
  const updatePost = async () => {
    try {
      if (!title.trim() || !body.trim()) {
        setError("Post cannot be empty.");
        return;
      }

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

      const updatedPost = {
        id: editingId,
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      };

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update post.");
      }

      const data = await res.json();

      setPosts(
        posts.map((post) =>
          post.id === editingId ? { ...post, ...data } : post,
        ),
      );

      setEditingId(null);
      setTitle("");
      setBody("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Something went wrong while updating the post.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Posts Manager
          </h1>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingId ? "Edit Post" : "Add New Post"}
            </h2>

            <label className="text-gray-800 font-semibold block mb-1">
              Title
            </label>

            <input
              type="text"
              value={title}
              maxLength={80}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              className="w-full p-3 rounded-lg mb-2 border border-gray-300 text-gray-900"
            />

            <p className="text-gray-700 text-sm mb-3">
              {title.length}/80 characters
            </p>

            <label className="text-gray-800 font-semibold block mb-1">
              Post Description
            </label>

            <textarea
              value={body}
              maxLength={300}
              onChange={(e) => {
                setBody(e.target.value);
                setError("");
              }}
              className="w-full p-3 rounded-lg mb-2 border border-gray-300 h-28 resize-none text-gray-900"
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

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </div>

          <div className="space-y-6">
            {currentPosts.length === 0 ? (
              <div className="bg-white text-center p-10 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-gray-800">
                  No Posts Found
                </h2>
              </div>
            ) : (
              currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border"
                >
                  <p className="mb-2 break-all text-gray-900 font-semibold">
                    <b>Title:</b> {post.title}
                  </p>

                  <p className="break-all text-gray-800">
                    <b className="text-gray-900">Description:</b> {post.body}
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
