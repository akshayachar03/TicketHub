import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-7xl font-bold text-cyan-400">404</h1>

      <p className="text-xl">Page Not Found</p>

      <Link
        to="/"
        className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
