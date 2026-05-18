import { useState, useEffect } from 'react';
import PatientCard from '../components/PatientCard';

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');

  


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <span className="font-medium text-gray-800">MedDash</span>
        <div className="flex items-center gap-3">
          <span className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-500">Doctor</span>
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-sm font-medium flex items-center justify-center">DR</div>
          <button className="text-sm text-gray-500 hover:text-gray-800">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total patients', value: patients.length },
            { label: 'My patients', value: patients.length },
            { label: 'Processing', value: patients.filter(p => p.media?.some(m => m.status === 'PROCESSING')).length },
            { label: 'Completed today', value: 0 },
          ].map(s => (
            <div key={s.label} className="bg-gray-100 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-medium">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <input
            className="flex-1 min-w-40 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input
            className="w-36 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter by tag..."
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Search
          </button>
          <button className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            + Add patient
          </button>
        </div>

        {/* Patient grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map(p => <PatientCard key={p.id} patient={p}  />)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;