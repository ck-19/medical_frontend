function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel, isLoading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={isLoading ? undefined : onCancel} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl border border-gray-200 w-full max-w-sm shadow-xl p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
            {isLoading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
