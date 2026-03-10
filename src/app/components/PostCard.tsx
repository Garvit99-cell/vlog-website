import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>

      <p className="text-gray-600 mb-4">{post.body.substring(0, 100)}...</p>

      <Link href={`/posts/${post.id}`} className="text-blue-500 font-semibold">
        Read More →
      </Link>
    </div>
  );
}
