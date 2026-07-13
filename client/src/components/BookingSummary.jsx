function BookingSummary({
  movie,
  selectedDate,
  selectedTime,
  selectedSeats,
  loading,
  onConfirm,
}) {
  const seatPrice = 250;

  const totalAmount = selectedSeats.length * seatPrice;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Booking Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Movie</span>
          <span>{movie?.title}</span>
        </div>

        <div className="flex justify-between">
          <span>Date</span>
          <span>{selectedDate || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Show Time</span>
          <span>{selectedTime || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Seats</span>

          <span>
            {selectedSeats.length
              ? selectedSeats.join(", ")
              : "-"}
          </span>
        </div>

        <hr className="border-slate-700" />

        <div className="flex justify-between">
          <span>Seat Price</span>
          <span>₹250</span>
        </div>

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          onClick={onConfirm}
          disabled={
            loading ||
            !selectedDate ||
            !selectedTime ||
            selectedSeats.length === 0
          }
          className="mt-6 w-full rounded-lg bg-cyan-500 py-4 font-bold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;