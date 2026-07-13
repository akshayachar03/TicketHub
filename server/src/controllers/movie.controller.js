import {
  getAllMovies,
  getMovieById,
  createMovie,
} from "../services/movie.service.js";

/**
 * GET /api/v1/movies
 */
export const fetchMovies = async (req, res) => {
  try {
    const movies = await getAllMovies();

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    });
  }
};

/**
 * GET /api/v1/movies/:id
 */
export const fetchMovieById = async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movie",
    });
  }
};

/**
 * POST /api/v1/movies
 */
export const addMovie = async (req, res) => {
  try {
    const movie = await createMovie(req.body);

    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create movie",
    });
  }
};
