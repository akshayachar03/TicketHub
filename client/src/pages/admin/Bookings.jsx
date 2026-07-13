import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import adminService from "../../services/admin.service";
import {
  showError,
} from "../../utils/toast";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await adminService.getBookings();
      setBookings(response.data);
    } catch (e) {
      console.error(e);
      showError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((b) =>
      (b.user?.name || "").toLowerCase().includes(q) ||
      (b.user?.email || "").toLowerCase().includes(q) ||
      (b.movie?.title || "").toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const totalRevenue = filtered.reduce(
    (sum, b) => sum + (b.totalAmount || 0),
    0
  );

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Booking Management</h1>
          <p className="mt-2 text-slate-400">
            Total Bookings: {filtered.length} | Revenue: ₹{totalRevenue}
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user or movie..."
          className="w-80 rounded-lg bg-slate-800 px-4 py-3"
        />
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="overflow-hidden rounded-xl bg-slate-900">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">Movie</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Seats</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b._id} className="border-t border-slate-800">
                  <td className="p-4">{b.movie?.title}</td>
                  <td className="p-4">
                    <div>{b.user?.name}</div>
                    <div className="text-sm text-slate-400">{b.user?.email}</div>
                  </td>
                  <td className="p-4">{(b.seats || []).join(", ")}</td>
                  <td className="p-4">₹{b.totalAmount}</td>
                  <td className="p-4">{b.status}</td>
                  <td className="p-4">{new Date(b.bookingDate).toLocaleDateString()} {b.showTime}</td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelected(b)}
                      className="rounded bg-cyan-600 px-3 py-2 hover:bg-cyan-500"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="p-8 text-center">No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-lg rounded-xl bg-slate-900 p-6">
            <div className="mb-4 flex justify-between">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="space-y-3">
              <p><strong>Movie:</strong> {selected.movie?.title}</p>
              <p><strong>User:</strong> {selected.user?.name}</p>
              <p><strong>Email:</strong> {selected.user?.email}</p>
              <p><strong>Seats:</strong> {(selected.seats || []).join(", ")}</p>
              <p><strong>Amount:</strong> ₹{selected.totalAmount}</p>
              <p><strong>Status:</strong> {selected.status}</p>
              <p><strong>Date:</strong> {new Date(selected.bookingDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selected.showTime}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Bookings;