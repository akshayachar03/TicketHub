import { useEffect, useState } from "react";

function MovieFormModal({
  isOpen,
  onClose,
  onSave,
  movie = null,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    duration: "",
    director: "",
    cast: "",
    rating: "",
    releaseDate: "",
    posterUrl: "",
    bannerUrl: "",
    featured: false,
    isActive: true,
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        description: movie.description || "",
        genre: movie.genre?.join(", ") || "",
        language: movie.language || "",
        duration: movie.duration || "",
        director: movie.director || "",
        cast: movie.cast?.join(", ") || "",
        rating: movie.rating || "",
        releaseDate: movie.releaseDate
          ? movie.releaseDate.substring(0, 10)
          : "",
        posterUrl: movie.posterUrl || "",
        bannerUrl: movie.bannerUrl || "",
        featured: movie.featured,
        isActive: movie.isActive,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        genre: "",
        language: "",
        duration: "",
        director: "",
        cast: "",
        rating: "",
        releaseDate: "",
        posterUrl: "",
        bannerUrl: "",
        featured: false,
        isActive: true,
      });
    }
  }, [movie]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      genre: formData.genre
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),

      cast: formData.cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),

      duration: Number(formData.duration),
      rating: Number(formData.rating),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-slate-900 p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            {movie ? "Edit Movie" : "Add Movie"}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-white"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5"
        >

          <input
            name="title"
            placeholder="Movie Title"
            value={formData.title}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="genre"
            placeholder="Action, Sci-Fi"
            value={formData.genre}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="language"
            placeholder="English"
            value={formData.language}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="duration"
            type="number"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="cast"
            placeholder="Actor1, Actor2"
            value={formData.cast}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="posterUrl"
            placeholder="Poster URL"
            value={formData.posterUrl}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <input
            name="bannerUrl"
            placeholder="Banner URL"
            value={formData.bannerUrl}
            onChange={handleChange}
            className="rounded bg-slate-800 p-3"
            required
          />

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <button
            type="submit"
            className="rounded-lg bg-cyan-500 py-3 font-semibold text-slate-900"
          >
            {movie ? "Update Movie" : "Save Movie"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default MovieFormModal;