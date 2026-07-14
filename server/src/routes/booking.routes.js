import express from "express";

import {
  addBooking,
  fetchMyBookings,
  fetchBookedSeats,
} from "../controllers/booking.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public endpoint to fetch booked seats
router.get("/booked-seats", fetchBookedSeats);

// Protected endpoints
router.post("/", authenticate, addBooking);
router.get("/my-bookings", authenticate, fetchMyBookings);

export default router;