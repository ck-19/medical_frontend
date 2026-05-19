import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PatientCard from '../components/PatientCard';
import { logout } from '../utils/auth';
import { getMyPatients } from '../api/Api';
import { showError, getApiErrorMessage } from '../utils/toast';


const formatTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    return tags.replace(/[{}"]/g, '').split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
};

function Dashboard() {

  const navigate = useNavigate();
  const [patients,setPatients]= useState([]);
  const [loading,setLoading]= useState(true);
  const [search,setSearch]= useState('');
  const [tag,setTag]= useState('');
  const [date,setDate]= useState('');

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.phone?.toLowerCase().includes(q);

      const tagQ = tag.trim().toLowerCase();
      const patientTags = formatTags(p.tags).map((t) => t.toLowerCase());
      const matchesTag = !tagQ || patientTags.some((t) => t.includes(tagQ));

      const dob = p.date_of_birth ? String(p.date_of_birth).slice(0, 10) : '';
      const matchesDate = !date || dob === date;

      return matchesSearch && matchesTag && matchesDate;
    });
  }, [patients, search, tag, date]);

  const sidebarItems = [
    { key: 'patients', label: 'My patients'},
  ];

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await getMyPatients();
        setPatients(data?.rows ?? []);
      } catch (err) {
        showError(getApiErrorMessage(err, 'Failed to load your patients'));
        if (err.response?.status === 401) {
          logout(navigate);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [navigate]);

  
  return (
    <AppLayout
      role="doctor"
      sidebarItems={sidebarItems}
      activeTab="patients"
      mainClassName="flex-1 p-6 max-w-6xl w-full mx-auto">

      <h1 className="text-lg font-medium text-gray-800 mb-4">My patients</h1>


      <div className="flex gap-2 mb-5 flex-wrap">
        <input
          className="flex-1 min-w-40 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="w-36 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Filter by tag..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 text-center py-12">Loading your patients...</p>
      ) : filteredPatients.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-12">
          {patients.length === 0
            ? 'No patients assigned to you yet.'
            : 'No patients match your filters.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

export default Dashboard;