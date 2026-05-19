import { useState, useEffect } from 'react';
import { addPatient, updatePatient } from '../api/Api';
import { showSuccess, showError, getApiErrorMessage } from '../utils/toast';
import { formatDateForInput } from '../utils/date';

const emptyForm = {
  name: '',
  date_of_birth: '',
  email: '',
  phone: '',
  notes: '',
  tags: '',
};

const formatTagsForInput = (tags) => {
  if (!tags) return '';
  if (Array.isArray(tags)) return tags.join(', ');
  return String(tags);
};

const patientToForm = (patient) => {
  if (!patient) return emptyForm;
  return {
    name: patient.name || '',
    date_of_birth: formatDateForInput(patient.date_of_birth),
    email: patient.email || '',
    phone: patient.phone || '',
    notes: patient.notes || '',
    tags: formatTagsForInput(patient.tags),
  };
};

function AddPatientModal({ open, onClose, patient, onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = Boolean(patient?.id);

  useEffect(() => {
    if (open) {
      setForm(patientToForm(patient));
    }
  }, [open, patient]);

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
    const payload = {
      name: form.name.trim(),
      date_of_birth: form.date_of_birth,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      notes: form.notes.trim() || null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    setIsSubmitting(true);
    try {
      const result = isEdit
        ? await updatePatient(patient.id, payload)
        : await addPatient(payload);
      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess(result?.message || (isEdit ? 'Patient updated successfully' : 'Patient added successfully'));
        onSuccess?.();
        setForm(emptyForm);
        onClose();
      }
    } catch (err) {
      showError(getApiErrorMessage(err, isEdit ? 'Failed to update patient' : 'Failed to add patient'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">{isEdit ? 'Edit patient' : 'Add patient'}</h2>
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
            <label className="text-sm text-gray-500 block mb-1">Date of birth *</label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Tags</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="comma separated"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
              {isSubmitting ? 'Saving...' : isEdit ? 'Update patient' : 'Add patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
