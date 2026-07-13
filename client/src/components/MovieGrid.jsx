import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  title = "Now Showing",
  subtitle = "Explore the latest movies and web series.",
  showHeader = true,
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {showHeader && (
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-2 text-slate-400">
              {subtitle}
            </p>
          </div>

          <span className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-cyan-400">
            {movies.length} Titles
          </span>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieGrid;
