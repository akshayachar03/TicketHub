import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import bookingService from "../services/booking.service";

import Navbar from "../components/Navbar";
import ShowSelector from "../components/ShowSelector";
import SeatGrid from "../components/SeatGrid";
import BookingSummary from "../components/BookingSummary";
import {
  showSuccess,
  showError,
} from "../utils/toast";

function Booking() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = useMemo(getAvailableDates, []);

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      loadBookedSeats();
    }
  }, [selectedDate, selectedTime]);

  const fetchMovie = async () => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      setMovie(response.data.data);
      setSelectedDate(getAvailableDates()[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadBookedSeats = async () => {
    try {
      const response = await bookingService.getBookedSeats(
        movieId,
        selectedDate,
        selectedTime
      );

      const seats = response.data || [];
      setBookedSeats(seats);

      setSelectedSeats((prev) =>
        prev.filter((seat) => !seats.includes(seat))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleBooking = async () => {
    try {
      setBookingLoading(true);

      const response = await bookingService.createBooking({
        movie: movie._id,
        bookingDate: selectedDate,
        showTime: selectedTime,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * 250,
      });
      showSuccess("Booking confirmed successfully.");
      navigate("/booking-success", {
        state: {
          booking: response.data,
          movie,
        },
      });
    } catch (error) {
      console.error(error);

      showError(
        error?.response?.data?.message ||
          "Booking failed."
      );

      if (selectedDate && selectedTime) {
        loadBookedSeats();
      }
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          Loading booking...
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          to={`/movies/${movieId}`}
          className="rounded-lg bg-slate-800 px-5 py-2 hover:bg-slate-700"
        >
          ← Back
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rounded-xl"
            />

            <h1 className="mt-6 text-4xl font-bold">{movie.title}</h1>

            <p className="mt-4 text-slate-300">{movie.description}</p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-slate-900 p-6">
              <h2 className="mb-6 text-2xl font-bold">Select Date</h2>

              <div className="mb-10 flex flex-wrap gap-3">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`rounded-lg px-5 py-3 font-semibold transition ${
                      selectedDate === date
                        ? "bg-cyan-500 text-slate-900"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              <ShowSelector
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />

              <SeatGrid
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bookedSeats={bookedSeats}
              />

              <BookingSummary
                movie={movie}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedSeats={selectedSeats}
                loading={bookingLoading}
                onConfirm={handleBooking}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;