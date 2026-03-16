"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // Get user from Redux store
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-xl font-bold">DevVlog</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/comments">Comments</Link>
            <Link href="/albums">Albums</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/todos">Todos</Link>
            <Link href="/users">Users</Link>

            {/* Profile */}
            {user && (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full cursor-pointer border-2 border-white"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <img src={user.avatar} className="w-8 h-8 rounded-full" />
                      <span className="font-medium">{user.name}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="flex flex-col gap-4 pb-4 md:hidden">
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/comments">Comments</Link>
            <Link href="/albums">Albums</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/todos">Todos</Link>
            <Link href="/users">Users</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
