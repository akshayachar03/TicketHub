const ROWS = ["A", "B", "C", "D", "E"];
const COLS = 8;

function SeatGrid({
  selectedSeats,
  setSelectedSeats,
  bookedSeats = [],
}) {
  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="mb-5 text-2xl font-bold">
        Select Seats
      </h2>

      <div className="mb-8 rounded-xl bg-slate-800 p-4 text-center">
        <div className="mx-auto mb-2 h-2 w-3/4 rounded-full bg-cyan-400"></div>
        <p className="text-sm text-slate-300">
          Screen
        </p>
      </div>

      <div className="space-y-4">
        {ROWS.map((row) => (
          <div
            key={row}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-6 font-bold text-cyan-400">
              {row}
            </div>

            {Array.from({ length: COLS }).map((_, index) => {
              const seat = `${row}${index + 1}`;

              const isBooked =
                bookedSeats.includes(seat);

              const isSelected =
                selectedSeats.includes(seat);

              let className =
                "h-12 w-12 rounded-lg border font-semibold transition ";

              if (isBooked) {
                className +=
                  "cursor-not-allowed border-red-600 bg-red-600 text-white opacity-80";
              } else if (isSelected) {
                className +=
                  "border-cyan-500 bg-cyan-500 text-slate-900";
              } else {
                className +=
                  "border-slate-700 bg-slate-800 text-white hover:bg-slate-700";
              }

              return (
                <button
                  key={seat}
                  type="button"
                  disabled={isBooked}
                  onClick={() => toggleSeat(seat)}
                  className={className}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded border border-slate-700 bg-slate-800"></div>
          <span>Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-cyan-500"></div>
          <span>Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-red-600"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}

export default SeatGrid;