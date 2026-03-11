"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}

          <h1 className="text-xl font-bold">DevVlog</h1>

          {/* Desktop Menu */}

          <div className="hidden md:flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/comments">Comments</Link>
            <Link href="/albums">Albums</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/todos">Todos</Link>
            <Link href="/users">Users</Link>
          </div>

          {/* Mobile Menu Button */}

          <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="flex flex-col gap-4 pb-4 md:hidden">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/posts" onClick={() => setOpen(false)}>
              Posts
            </Link>
            <Link href="/comments" onClick={() => setOpen(false)}>
              Comments
            </Link>
            <Link href="/albums" onClick={() => setOpen(false)}>
              Albums
            </Link>
            <Link href="/photos" onClick={() => setOpen(false)}>
              Photos
            </Link>
            <Link href="/todos" onClick={() => setOpen(false)}>
              Todos
            </Link>
            <Link href="/users" onClick={() => setOpen(false)}>
              Users
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
