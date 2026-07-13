import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import MovieFormModal from "../../components/admin/MovieFormModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import adminService from "../../services/admin.service";
import { showSuccess, showError } from "../../utils/toast";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleteMovie, setDeleteMovie] = useState(null);

  useEffect(() => { loadMovies(); }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const res = await adminService.getMovies();
      setMovies(res.data);
    } catch {
      showError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  const saveMovie = async (data) => {
    try {
      if (selectedMovie) {
        await adminService.updateMovie(selectedMovie._id, data);
        showSuccess("Movie updated successfully.");
      } else {
        await adminService.createMovie(data);
        showSuccess("Movie added successfully.");
      }
      setShowModal(false);
      setSelectedMovie(null);
      loadMovies();
    } catch (e) {
      showError(e?.response?.data?.message || "Unable to save movie.");
    }
  };

  const confirmDelete = async () => {
    try {
      await adminService.deleteMovie(deleteMovie._id);
      showSuccess("Movie deleted successfully.");
      setDeleteMovie(null);
      loadMovies();
    } catch (e) {
      showError(e?.response?.data?.message || "Unable to delete movie.");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Movie Management</h1>
        <button
          onClick={() => { setSelectedMovie(null); setShowModal(true); }}
          className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-900"
        >
          + Add Movie
        </button>
      </div>

      {loading ? <p>Loading movies...</p> : (
        <div className="overflow-hidden rounded-xl bg-slate-900">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">Poster</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Genre</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie=>(
                <tr key={movie._id} className="border-t border-slate-800">
                  <td className="p-4"><img src={movie.posterUrl} alt="" className="h-20 w-14 rounded object-cover"/></td>
                  <td className="p-4">{movie.title}</td>
                  <td className="p-4">{movie.genre.join(", ")}</td>
                  <td className="p-4">⭐ {movie.rating}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-600 px-3 py-2" onClick={()=>{setSelectedMovie(movie);setShowModal(true);}}>Edit</button>
                      <button className="rounded bg-red-600 px-3 py-2" onClick={()=>setDeleteMovie(movie)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MovieFormModal
        isOpen={showModal}
        movie={selectedMovie}
        onClose={()=>{setShowModal(false);setSelectedMovie(null);}}
        onSave={saveMovie}
      />

      <ConfirmModal
        open={!!deleteMovie}
        title="Delete Movie"
        message={deleteMovie ? `Are you sure you want to delete "${deleteMovie.title}"? This action cannot be undone.` : ""}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={()=>setDeleteMovie(null)}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
}

export default Movies;