import { Link, NavLink } from "react-router-dom";
import { Search, User } from "lucide-react";

function Navbar() {
  const navClass = ({ isActive }) =>
    isActive
      ? "text-cyan-400 font-semibold"
      : "text-slate-300 hover:text-white transition";

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
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-slate-300 hover:text-cyan-400">
            <Search size={20} />
          </button>

          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            <User size={18} />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
