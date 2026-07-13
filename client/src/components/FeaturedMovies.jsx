import MovieGrid from "./MovieGrid";

function FeaturedMovies({ movies }) {
  const featured = movies.filter((movie) => movie.featured);

  return (
    <MovieGrid
      movies={featured}
      title="⭐ Featured Movies"
      subtitle="Hand-picked movies you shouldn't miss."
    />
  );
}

export default FeaturedMovies;
