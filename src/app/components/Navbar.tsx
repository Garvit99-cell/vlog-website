import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">DevVlog</h1>

        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/comments">Comments</Link>
          <Link href="/albums">Albums</Link>
          <Link href="/photos">Photos</Link>
          <Link href="/todos">Todos</Link>
          <Link href="/users">Users</Link>
        </div>
      </div>
    </nav>
  );
}
