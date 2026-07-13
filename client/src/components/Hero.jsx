import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 text-cyan-400 font-semibold uppercase tracking-widest">
          Welcome to
        </p>

        <h1 className="text-5xl font-extrabold text-white md:text-7xl">
          DevOps
          <span className="block text-cyan-400">
            TicketHub
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Book movie tickets, discover trending films and web series,
          and experience a modern movie booking platform powered by
          React, Node.js, MongoDB and Azure DevOps.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/movies"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
          >
            Browse Movies
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
