import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <h1 className="text-6xl font-bold mb-4">DevVlog Platform</h1>

        <p className="text-xl">Explore Posts, Photos, Users and More</p>
      </div>
    </div>
  );
}
