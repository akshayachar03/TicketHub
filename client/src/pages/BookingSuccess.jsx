import { Link, Navigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";

function BookingSuccess() {
  const location = useLocation();

  const booking = location.state?.booking;
  const movie = location.state?.movie;

  if (!booking || !movie) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-green-600 bg-slate-900 p-10 text-white">
          <div className="text-center">
            <div className="text-7xl">✅</div>

            <h1 className="mt-4 text-4xl font-bold">
              Booking Confirmed
            </h1>

            <p className="mt-3 text-slate-400">
              Your booking has been successfully confirmed.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span className="text-slate-400">Movie</span>
              <span>{movie.title}</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span className="text-slate-400">Booking ID</span>
              <span>{booking._id}</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span className="text-slate-400">Date</span>
              <span>{booking.bookingDate}</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span className="text-slate-400">Show Time</span>
              <span>{booking.showTime}</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span className="text-slate-400">Seats</span>
              <span>{booking.seats?.join(", ")}</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span className="text-slate-400">Amount</span>
              <span className="font-bold text-cyan-400">
                ₹{booking.totalAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>

              <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                {booking.bookingStatus || "CONFIRMED"}
              </span>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Link
              to="/my-bookings"
              className="flex-1 rounded-lg bg-cyan-500 py-3 text-center font-semibold text-slate-900 hover:bg-cyan-400"
            >
              My Bookings
            </Link>

            <Link
              to="/movies"
              className="flex-1 rounded-lg border border-slate-700 py-3 text-center font-semibold hover:border-cyan-400"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookingSuccess;