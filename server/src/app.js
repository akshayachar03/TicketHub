import express from "express";
import cors from "cors";

import movieRoutes from "./routes/movie.routes.js";
import theaterRoutes from "./routes/theater.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DevOps TicketHub API 🚀",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/movies", movieRoutes);

app.use("/api/v1/theaters", theaterRoutes);

export default app;
