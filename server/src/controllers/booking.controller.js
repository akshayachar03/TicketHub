import {
  createBooking,
  getBookingsByUser,
  getBookedSeats,
  checkSeatAvailability,
} from "../services/booking.service.js";

export async function addBooking(req, res) {
  try {
    const {
      movie,
      bookingDate,
      showTime,
      seats,
    } = req.body;

    const availability =
      await checkSeatAvailability(
        movie,
        bookingDate,
        showTime,
        seats
      );

    if (!availability.available) {
      return res.status(409).json({
        success: false,
        message: "One or more seats are already booked.",
        bookedSeats: availability.conflicts,
      });
    }

    const booking = await createBooking({
      ...req.body,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchMyBookings(req, res) {
  try {
    const bookings = await getBookingsByUser(req.user.id);

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchBookedSeats(req, res) {
  try {
    const { movieId, bookingDate, showTime } = req.query;

    if (!movieId || !bookingDate || !showTime) {
      return res.status(400).json({
        success: false,
        message:
          "movieId, bookingDate and showTime are required.",
      });
    }

    const seats = await getBookedSeats(
      movieId,
      bookingDate,
      showTime
    );

    return res.status(200).json({
      success: true,
      data: seats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}