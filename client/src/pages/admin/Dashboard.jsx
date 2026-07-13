import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import adminService from "../../services/admin.service";

function Dashboard() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response =
        await adminService.getDashboardStats();

      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>

      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Movies
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {stats.totalMovies}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Users
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {stats.totalUsers}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Bookings
            </h3>

            <p className="mt-3 text-4xl font-bold">
              {stats.totalBookings}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6">
            <h3 className="text-slate-400">
              Revenue
            </h3>

            <p className="mt-3 text-4xl font-bold text-cyan-400">
              ₹{stats.totalRevenue}
            </p>
          </div>

        </div>
      )}

    </AdminLayout>
  );
}

export default Dashboard;