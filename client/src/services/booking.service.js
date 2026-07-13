import api from "../api/api";
import authService from "./auth.service";

const bookingService = {
  async createBooking(bookingData) {
    const token = authService.getToken();

    const response = await api.post("/bookings", bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async getMyBookings() {
    const token = authService.getToken();

    const response = await api.get("/bookings/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async getBookedSeats(movieId, bookingDate, showTime) {
    const response = await api.get("/bookings/booked-seats", {
      params: {
        movieId,
        bookingDate,
        showTime,
      },
    });

    return response.data;
  },
};

export default bookingService;