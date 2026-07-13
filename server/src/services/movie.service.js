import Movie from "../models/movie.model.js";

/**
 * Get all movies
 */
export const getAllMovies = async () => {
  return await Movie.find().sort({ createdAt: -1 });
};

/**
 * Get movie by ID
 */
export const getMovieById = async (id) => {
  return await Movie.findById(id);
};

/**
 * Create a new movie
 */
export const createMovie = async (movieData) => {
  return await Movie.create(movieData);
};
