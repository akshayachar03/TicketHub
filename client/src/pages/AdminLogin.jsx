import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import adminService from "../services/admin.service";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await adminService.login(formData);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Admin Portal
          </h1>

          <p className="mt-2 text-slate-400">
            TicketHub Administration
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500 p-3 text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Admin Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            ← Back to User Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;