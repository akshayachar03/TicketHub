import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

import Layout from "../components/Layout";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const response = await api.get("/movies");
      setMovies(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const genres = useMemo(() => {
    return [...new Set(movies.flatMap((m) => m.genre))].sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre =
        genre === "" || movie.genre.includes(genre);

      return matchesSearch && matchesGenre;
    });
  }, [movies, search, genre]);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-5xl font-bold">
          Browse Movies
        </h1>

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-3">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <GenreFilter
            genres={genres}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : (
          <MovieGrid
            movies={filteredMovies}
            title="🎬 Browse Movies"
            subtitle="Search and discover your favorites."
          />
        )}
      </div>
    </Layout>
  );
}

export default Movies;
