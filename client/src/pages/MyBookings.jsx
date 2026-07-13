import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import bookingService from "../services/booking.service";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingService.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold text-white">
            🎟️ My Bookings
          </h1>

          <p className="mt-6 text-slate-400">
            Loading bookings...
          </p>
        </div>
      </Layout>
    );
  }

  if (bookings.length === 0) {
    return (
      <Layout>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="mb-3 text-4xl font-bold text-white">
            🎟️ My Bookings
          </h1>

          <p className="mb-10 text-slate-400">
            View all your booked movie tickets here.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">
              No bookings yet
            </h2>

            <p className="mb-8 text-slate-400">
              Once you book a movie, it will appear here.
            </p>

            <Link
              to="/movies"
              className="inline-flex rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-bold text-white">
          🎟️ My Bookings
        </h1>

        <p className="mb-10 text-slate-400">
          {bookings.length} booking(s) found
        </p>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
            >
              <div className="grid md:grid-cols-4">
                <img
                  src={booking.movie.posterUrl}
                  alt={booking.movie.title}
                  className="h-full w-full object-cover"
                />

                <div className="space-y-3 p-6 md:col-span-3">
                  <h2 className="text-3xl font-bold text-white">
                    {booking.movie.title}
                  </h2>

                  <div className="grid gap-4 pt-4 md:grid-cols-2">
                    <div>
                      <p className="text-slate-400">
                        Booking Date
                      </p>

                      <p>{booking.bookingDate}</p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Show Time
                      </p>

                      <p>{booking.showTime}</p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Seats
                      </p>

                      <p>{booking.seats.join(", ")}</p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Total Amount
                      </p>

                      <p className="font-semibold text-cyan-400">
                        ₹{booking.totalAmount}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Booking Status
                      </p>

                      <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                        {booking.bookingStatus}
                      </span>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Payment Status
                      </p>

                      <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default MyBookings;