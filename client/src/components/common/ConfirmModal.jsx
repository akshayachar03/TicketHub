function ConfirmModal({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-red-600 hover:bg-red-500",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-md rounded-xl bg-slate-900 shadow-2xl">

        <div className="border-b border-slate-800 p-6">
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        <div className="p-6">
          <p className="leading-7 text-slate-300">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 p-6">

          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-700 px-5 py-2 text-white transition hover:bg-slate-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-lg px-5 py-2 font-semibold text-white transition ${confirmButtonClass}`}
          >
            {confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;