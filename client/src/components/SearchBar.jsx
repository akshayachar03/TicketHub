import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
      />
    </div>
  );
}

export default SearchBar;
