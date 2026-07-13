import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await api.get(`/movies/${id}`);
      setMovie(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          Loading movie...
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-white">
          <h1 className="text-4xl font-bold">Movie not found</h1>

          <Link
            to="/movies"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900"
          >
            Back to Movies
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          to="/"
          className="inline-block rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
        >
          ← Back
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-5xl font-bold">{movie.title}</h1>

            <div className="mt-4 flex flex-wrap gap-3">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-cyan-600 px-4 py-2 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-lg">
              <p>
                <strong>⭐ Rating:</strong> {movie.rating}/10
              </p>

              <p>
                <strong>🎬 Director:</strong> {movie.director}
              </p>

              <p>
                <strong>⏱ Duration:</strong> {movie.duration} minutes
              </p>

              <p>
                <strong>🌐 Language:</strong> {movie.language}
              </p>

              <p>
                <strong>📅 Release Date:</strong>{" "}
                {new Date(movie.releaseDate).toLocaleDateString()}
              </p>

              <p>
                <strong>🎭 Cast:</strong> {movie.cast.join(", ")}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-2xl font-bold">Description</h2>

              <p className="leading-8 text-slate-300">
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
