import Booking from "../models/booking.model.js";

export async function createBooking(data) {
  return Booking.create(data);
}

export async function getBookingsByUser(userId) {
  return Booking.find({ user: userId })
    .populate("movie")
    .sort({ createdAt: -1 });
}

export async function getBookedSeats(
  movieId,
  bookingDate,
  showTime
) {
  const bookings = await Booking.find({
    movie: movieId,
    bookingDate,
    showTime,
    bookingStatus: "CONFIRMED",
  });

  return bookings.flatMap((booking) => booking.seats);
}

export async function checkSeatAvailability(
  movieId,
  bookingDate,
  showTime,
  requestedSeats
) {
  const bookedSeats = await getBookedSeats(
    movieId,
    bookingDate,
    showTime
  );

  const conflicts = requestedSeats.filter((seat) =>
    bookedSeats.includes(seat)
  );

  return {
    available: conflicts.length === 0,
    conflicts,
  };
}