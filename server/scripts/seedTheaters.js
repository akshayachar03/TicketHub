import dotenv from "dotenv";
import mongoose from "mongoose";

import Theater from "../src/models/theater.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

await Theater.deleteMany({});

await Theater.insertMany([
  {
    name: "PVR Lulu",
    city: "Kochi",
    location: "Lulu Mall",
    screens: 12,
  },
  {
    name: "INOX Centre Square",
    city: "Kochi",
    location: "Centre Square Mall",
    screens: 8,
  },
  {
    name: "Cinepolis",
    city: "Kochi",
    location: "Forum Mall",
    screens: 10,
  },
]);

console.log("✅ Theaters seeded successfully");

await mongoose.disconnect();
