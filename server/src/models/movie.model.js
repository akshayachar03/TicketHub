import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["movie", "series"],
      default: "movie",
    },

    genre: {
      type: [String],
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    language: {
      type: String,
      default: "English",
    },

    director: {
      type: String,
      required: true,
    },

    cast: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    posterUrl: {
      type: String,
      default: "",
    },

    bannerUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
