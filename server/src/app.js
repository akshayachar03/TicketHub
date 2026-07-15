import express from "express";
import cors from "cors";

import movieRoutes from "./routes/movie.routes.js";
import theaterRoutes from "./routes/theater.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import register from "./monitoring/prometheus.js";
import metricsMiddleware from "./middleware/metrics.middleware.js";

console.log("✅ app.js loaded");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to TicketHub API 🚀",
    version: "1.0.0",
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "TicketHub API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
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