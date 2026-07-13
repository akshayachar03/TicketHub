import express from "express";
import {
  fetchMovies,
  fetchMovieById,
  addMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

// GET all movies
router.get("/", fetchMovies);

// GET movie by ID
router.get("/:id", fetchMovieById);

// POST new movie
router.post("/", addMovie);

export default router;
