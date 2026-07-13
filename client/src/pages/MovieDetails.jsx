import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

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

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate(`/booking/${movie._id}`);
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
          <h1 className="mb-6 text-4xl font-bold">
            Movie not found
          </h1>

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
          to="/movies"
          className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
        >
          ← Back
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl"
          />

          <div>
            <h1 className="text-5xl font-bold">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-cyan-600 px-3 py-1 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-lg">
              <p>⭐ {movie.rating}/10</p>
              <p>🎬 {movie.director}</p>
              <p>⏱ {movie.duration} min</p>
              <p>🌐 {movie.language}</p>
              <p>
                📅{" "}
                {new Date(
                  movie.releaseDate
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-2xl font-bold">
                Description
              </h2>

              <p className="leading-8 text-slate-300">
                {movie.description}
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="mt-10 rounded-xl bg-cyan-500 px-8 py-4 text-lg font-bold text-slate-900 transition hover:bg-cyan-400"
            >
              🎟 Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;