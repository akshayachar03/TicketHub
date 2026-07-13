import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DevOps TicketHub API 🚀",
    version: "1.0.0"
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "backend",
    timestamp: new Date().toISOString()
  });
});

export default app;
