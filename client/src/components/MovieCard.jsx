import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="h-80 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="truncate text-lg font-bold text-white">
            {movie.title}
          </h2>

          <span className="rounded bg-cyan-500 px-2 py-1 text-sm font-semibold text-slate-900">
            ⭐ {movie.rating}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genre.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="text-sm leading-6 text-slate-400">
          {movie.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-slate-500">
            {movie.duration} min
          </span>

          <Link
            to={`/movies/${movie._id}`}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
