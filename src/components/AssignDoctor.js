import { useState, useEffect } from 'react';
import { assignDoctor } from '../api/Api';
import { showSuccess, showError, getApiErrorMessage } from '../utils/toast';

function AssignDoctorModal({ open, patient, doctors, onClose, onSuccess }) {
  const [doctorId, setDoctorId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && patient) {
      setDoctorId(patient.doctor_id ? String(patient.doctor_id) : '');
    }
  }, [open, patient]);

  if (!open || !patient) return null;

  const handleClose = () => {
    setDoctorId('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await assignDoctor(
        patient.id,
        doctorId || null
      );
      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess(result?.message || 'Doctor assigned successfully');
        onSuccess?.();
        handleClose();
      }
    } catch (err) {
      showError(getApiErrorMessage(err, 'Failed to assign doctor'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl border border-gray-200 w-full max-w-md shadow-xl">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Assign doctor</h2>
          <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-xl p-1">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-500">
            Select a doctor for <span className="font-medium text-gray-800">{patient.name}</span>
          </p>

          <div>
            <label className="text-sm text-gray-500 block mb-1">Doctor</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">No doctor assigned</option>
              {doctors.map((d) => (
                <option key={d.id} value={String(d.id)}>
                  {d.name} — {d.specialization}
                </option>
              ))}
            </select>
          </div>

          {doctors.length === 0 && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              No doctors available. Add a doctor first.
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-gray-200 py-2 rounded-lg text-sm hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignDoctorModal;
