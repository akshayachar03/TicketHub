const SHOW_TIMES = [
  "10:00 AM",
  "01:00 PM",
  "04:00 PM",
  "07:00 PM",
  "10:00 PM",
];

function ShowSelector({
  selectedTime,
  setSelectedTime,
}) {
  return (
    <div className="mb-10">
      <h2 className="mb-5 text-2xl font-bold">
        Select Show Time
      </h2>

      <div className="flex flex-wrap gap-4">
        {SHOW_TIMES.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`rounded-lg px-6 py-3 font-semibold transition ${
              selectedTime === time
                ? "bg-cyan-500 text-slate-900"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShowSelector;