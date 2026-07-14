import {
  getDashboardStats,
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllBookings,
  getBookingById,
} from "../services/admin.service.js";

/* ---------------- Dashboard ---------------- */

export async function dashboard(req, res) {
  try {
    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/* ---------------- Movies ---------------- */

export async function fetchMovies(req, res) {
  try {
    const movies = await getAllMovies();

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchMovie(req, res) {
  try {
    const movie = await getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function addMovie(req, res) {
  try {
    const movie = await createMovie(req.body);

    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editMovie(req, res) {
  try {
    const movie = await updateMovie(
      req.params.id,
      req.body
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeMovie(req, res) {
  try {
    await deleteMovie(req.params.id);

    res.json({
      success: true,
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/* ---------------- Users ---------------- */

export async function fetchUsers(req, res) {
  try {
    const users = await getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchUser(req, res) {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editUser(req, res) {
  try {
    const user = await updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeUser(req, res) {
  try {
    await deleteUser(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/* ---------------- Bookings ---------------- */

export async function fetchBookings(req, res) {
  try {
    const bookings = await getAllBookings();

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchBooking(req, res) {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}