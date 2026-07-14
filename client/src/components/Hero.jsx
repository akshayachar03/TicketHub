import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Hero() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
          Welcome to
        </p>

        <h1 className="text-5xl font-extrabold text-white md:text-7xl">
          <span className="block text-cyan-400">
            TicketHub
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Book your favorite movie tickets, explore the latest releases, and enjoy a seamless cinema booking experience with TicketHub.
        </p>

        {isAuthenticated && (
          <p className="mt-6 text-lg text-cyan-400">
            Welcome back,{" "}
            <span className="font-semibold">
              {user?.name}
            </span>{" "}
            👋
          </p>
        )}

        <div className="mt-10 flex gap-4">
          <Link
            to="/movies"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Browse Movies
          </Link>

          {!isAuthenticated && (
            <Link
              to="/register"
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;