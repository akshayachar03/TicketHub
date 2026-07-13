import { useEffect, useState } from "react";
import api from "../api/api";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import FeaturedMovies from "../components/FeaturedMovies";
import MovieGrid from "../components/MovieGrid";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout>
      <Hero />

      {loading ? (
        <div className="py-20 text-center">
          Loading movies...
        </div>
      ) : (
        <>
          <FeaturedMovies movies={movies} />

          <MovieGrid
            movies={movies}
            title="🎬 All Movies"
            subtitle="Browse our complete collection."
          />
        </>
      )}
    </Layout>
  );
}

export default Home;
