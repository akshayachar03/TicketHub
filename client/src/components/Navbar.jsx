import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, LogOut, Ticket } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-cyan-400 font-semibold"
      : "text-slate-300 hover:text-white transition";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-extrabold text-cyan-400"
        >
          🎬 DevOps TicketHub
        </Link>

        <nav className="flex items-center gap-8">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/movies" className={navClass}>
            Movies
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/my-bookings" className={navClass}>
              My Bookings
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button className="text-slate-300 hover:text-cyan-400">
            <Search size={20} />
          </button>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-400"
            >
              <User size={18} />
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg border border-cyan-500 px-4 py-2 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-900"
              >
                <User size={18} />
                {user?.name}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;