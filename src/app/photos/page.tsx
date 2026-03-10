import Navbar from "../components/Navbar";

async function getPhotos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=30",
  );
  return res.json();
}

export default async function Photos() {
  const photos = await getPhotos();

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl text-green-600 font-bold mb-8">
          Photo Gallery
        </h1>

        <div className="grid md:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.thumbnailUrl}
              className="rounded-lg shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
