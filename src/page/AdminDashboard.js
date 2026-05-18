import { useState, useEffect} from 'react';
import AddPatient from '../components/AddPatient';
import AddDoctor from '../components/AddDoctor';
import ConfirmDialog from '../components/ConfirmDialog';
import AssignDoctor from '../components/AssignDoctor';
import { getPatients, deletePatient, deleteDoctor, getDoctors } from '../api/Api';
import { showSuccess, showError, getApiErrorMessage } from '../utils/toast';

function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [assigningPatient, setAssigningPatient] = useState(null);
  const FetchData = async () => {
    try {
      const API = await getPatients();
      console.log(API?.rows);
      const allPatients = API?.rows || [];
      setPatients(allPatients);

      const API1 = await getDoctors();
      console.log(API1);
      const allDoctors = API1?.rows || [];
      setDoctors(allDoctors);

    } catch (err) {
      console.error("Error fetching patients data:", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const DeletePatient = async (id) => {
    try {
      setIsDeleting(true);
      const result = await deletePatient(id);
      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess(result?.message || 'Patient deleted successfully');
        FetchData();
      }
    } catch (err) {
      showError(getApiErrorMessage(err, 'Failed to delete patient'));
    } finally {
      setIsDeleting(false);
    }
  };

  const DeleteDoctor = async (id) => {
    try {
      setIsDeleting(true);
      const result = await deleteDoctor(id);
      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess(result?.message || 'Doctor deleted successfully');
        FetchData();
      }
    } catch (err) {
      showError(getApiErrorMessage(err, 'Failed to delete doctor'));
    } finally {
      setIsDeleting(false);
    }
  };

  const closePatientModal = () => {
    setShowAddPatient(false);
    setEditingPatient(null);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    if (confirmDelete.type === 'patient') {
      await DeletePatient(confirmDelete.id);
    } else {
      await DeleteDoctor(confirmDelete.id);
    }
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <span className="font-medium text-gray-800">MedDash</span>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1">Admin</span>
          <div className="w-8 h-8 rounded-full bg-red-50 text-red-700 text-sm font-medium flex items-center justify-center">AD</div>
          <button className="text-sm text-gray-500 hover:text-gray-800">Logout</button>
        </div>
      </nav>

      <div className="flex">

        {/* Sidebar */}
        <div className="w-44 bg-white border-r border-gray-200 min-h-screen pt-4">
          {[
            { key: 'overview', icon: 'layout-dashboard', label: 'Overview' },
            { key: 'patients', icon: 'users', label: 'Patients' },
            { key: 'doctors', icon: 'stethoscope', label: 'Doctors' },
          ].map(item => (
            <button key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left border-l-2 transition-colors
                ${activeTab === item.key
                  ? 'border-blue-600 bg-gray-50 text-gray-800 font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total patients', value: patients.length, },
              { label: 'Doctors', value: doctors.length, sub: 'All active' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-medium">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Patients table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium">All patients</h2>
              <button
                type="button"
                onClick={() => {
                  setEditingPatient(null);
                  setShowAddPatient(true);
                }}
                className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
                + Add patient
              </button>
            </div>
            <div className="flex gap-2 mb-4">
              <input className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search by name..." />
              <input className="w-28 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none" placeholder="Tag..." />
              <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none">
                <option>All doctors</option>
                {doctors.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Name</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">DOB</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Doctor</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Tags</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 pr-4 font-medium">{p.name}</td>
                    <td className="py-2.5 pr-4 text-gray-400 text-xs">{p.date_of_birth}</td>
                    <td className="py-2.5 pr-4 text-xs text-gray-500">
                      {p.doctor_name ? (
                        <span className="text-blue-700">{p.doctor_name}</span>
                      ) : (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4">
                      <div className="flex flex-wrap gap-1">
                        {p.tags?.map(t => (
                          <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setAssigningPatient(p)}
                          className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100">
                          Assign
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPatient(p)}
                          className="text-xs border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete({ type: 'patient', id: p.id, name: p.name })}
                          className="text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-100"
                          disabled={isDeleting}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Doctors table */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium">Doctors</h2>
              <button
                type="button"
                onClick={() => setShowAddDoctor(true)}
                className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
                + Add doctor
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Name</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Email</th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2 pr-4">Specialization </th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 pr-4 font-medium">{d.name}</td>
                    <td className="py-2.5 pr-4 text-gray-400 text-xs">{d.email}</td>
                    <td className="py-2.5 pr-4">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{d.specialization}</span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex gap-2">
                        <button className="text-xs border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50">Edit</button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete({ type: 'doctor', id: d.id, name: d.name })}
                          className="text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-100"
                          disabled={isDeleting}>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <AddPatient
        open={showAddPatient || !!editingPatient}
        patient={editingPatient}
        onClose={closePatientModal}
        onSuccess={FetchData}
      />
      <AddDoctor
        open={showAddDoctor}
        onClose={() => setShowAddDoctor(false)}
        onSuccess={FetchData}
      />

      <AssignDoctor
        open={!!assigningPatient}
        patient={assigningPatient}
        doctors={doctors}
        onClose={() => setAssigningPatient(null)}
        onSuccess={FetchData}
      />

      <ConfirmDialog
        open={!!confirmDelete}
        title={confirmDelete?.type === 'doctor' ? 'Remove doctor?' : 'Delete patient?'}
        message={
          confirmDelete
            ? `Are you sure you want to ${confirmDelete.type === 'doctor' ? 'remove' : 'delete'} "${confirmDelete.name}"? This action cannot be undone.`
            : ''
        }
        confirmLabel={confirmDelete?.type === 'doctor' ? 'Remove' : 'Delete'}
        onConfirm={handleConfirmDelete}
        onCancel={() => !isDeleting && setConfirmDelete(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default AdminDashboard;