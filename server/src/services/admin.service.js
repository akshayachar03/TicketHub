import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";

/* ---------------- Dashboard ---------------- */

export async function getDashboardStats() {
  const totalMovies = await Movie.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();

  const revenue = await Booking.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return {
    totalMovies,
    totalUsers,
    totalBookings,
    totalRevenue: revenue[0]?.total || 0,
  };
}

/* ---------------- Movies ---------------- */

export async function getAllMovies() {
  return Movie.find().sort({ createdAt: -1 });
}

export async function getMovieById(id) {
  return Movie.findById(id);
}

export async function createMovie(data) {
  return Movie.create(data);
}

export async function updateMovie(id, data) {
  return Movie.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteMovie(id) {
  return Movie.findByIdAndDelete(id);
}

/* ---------------- Users ---------------- */

export async function getAllUsers() {
  return User.find()
    .select("-password")
    .sort({ createdAt: -1 });
}

export async function getUserById(id) {
  return User.findById(id).select("-password");
}

export async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");
}

export async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

/* ---------------- Bookings ---------------- */

export async function getAllBookings() {
  return Booking.find()
    .populate("user", "name email")
    .populate("movie", "title posterUrl")
    .sort({ createdAt: -1 });
}

export async function getBookingById(id) {
  return Booking.findById(id)
    .populate("user", "name email")
    .populate("movie", "title posterUrl");
}