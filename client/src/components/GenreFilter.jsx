function GenreFilter({ genres, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
    >
      <option value="">All Genres</option>

      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;
