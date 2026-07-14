import express from "express";
import cors from "cors";

import movieRoutes from "./routes/movie.routes.js";
import theaterRoutes from "./routes/theater.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to TicketHub API 🚀",
    version: "1.0.0",
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/theaters", theaterRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/admin", adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;