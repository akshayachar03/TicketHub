import express from "express";

import {
  dashboard,

  fetchMovies,
  fetchMovie,
  addMovie,
  editMovie,
  removeMovie,

  fetchUsers,
  fetchUser,
  editUser,
  removeUser,

  fetchBookings,
  fetchBooking,

} from "../controllers/admin.controller.js";

import { authorizeAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

/* Dashboard */

router.get(
  "/dashboard",
  authorizeAdmin,
  dashboard
);

/* Movies */

router.get(
  "/movies",
  authorizeAdmin,
  fetchMovies
);

router.get(
  "/movies/:id",
  authorizeAdmin,
  fetchMovie
);

router.post(
  "/movies",
  authorizeAdmin,
  addMovie
);

router.put(
  "/movies/:id",
  authorizeAdmin,
  editMovie
);

router.delete(
  "/movies/:id",
  authorizeAdmin,
  removeMovie
);

/* Users */

router.get(
  "/users",
  authorizeAdmin,
  fetchUsers
);

router.get(
  "/users/:id",
  authorizeAdmin,
  fetchUser
);

router.put(
  "/users/:id",
  authorizeAdmin,
  editUser
);

router.delete(
  "/users/:id",
  authorizeAdmin,
  removeUser
);

/* Bookings */

router.get(
  "/bookings",
  authorizeAdmin,
  fetchBookings
);

router.get(
  "/bookings/:id",
  authorizeAdmin,
  fetchBooking
);

export default router;