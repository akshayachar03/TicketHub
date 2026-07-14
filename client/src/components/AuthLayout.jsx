import { Link } from "react-router-dom";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <Link
          to="/"
          className="mb-8 block text-center text-3xl font-bold text-cyan-400"
        >
          🎬 TicketHub
        </Link>

        <h1 className="text-3xl font-bold text-white text-center">
          {title}
        </h1>

        <p className="mt-2 mb-8 text-center text-slate-400">
          {subtitle}
        </p>

        {children}

        <div className="mt-8 text-center text-slate-400">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="font-semibold text-cyan-400 hover:underline"
          >
            {footerLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;