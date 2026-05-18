import { useState } from 'react';
import { addDoctor } from '../api/Api';
import { showSuccess, showError, getApiErrorMessage } from '../utils/toast';

const emptyForm = {
  name: '',
  email: '',
  specialization: '',
};

function AddDoctorModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await addDoctor({
        name: form.name.trim(),
        email: form.email.trim(),
        specialization: form.specialization.trim(),
      });
      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess(result?.message || 'Doctor added successfully');
        onSuccess?.();
        setForm(emptyForm);
        onClose();
      }
    } catch (err) {
      showError(getApiErrorMessage(err, 'Failed to add doctor'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Add doctor</h2>
          <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-xl p-1">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Specialization *</label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              required
              placeholder="e.g. Cardiology"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Add doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorModal;
