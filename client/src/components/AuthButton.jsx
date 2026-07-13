function AuthButton({
  children,
  loading,
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default AuthButton;