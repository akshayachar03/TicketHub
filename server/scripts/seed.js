import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../src/config/database.js";
import Movie from "../src/models/movie.model.js";
import movies from "../data/movies.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("🗑️ Clearing existing movies...");
    await Movie.deleteMany({});

    console.log("📥 Seeding movies...");
    await Movie.insertMany(movies);

    console.log(`✅ Successfully seeded ${movies.length} movies`);

    await mongoose.connection.close();

    console.log("🔒 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed");
    console.error(error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
