import { useState } from 'react';

const statusStyle = {
  PENDING:    'bg-yellow-50 text-yellow-700',
  PROCESSING: 'bg-blue-50 text-blue-700',
  COMPLETED:  'bg-green-50 text-green-700',
  FAILED:     'bg-red-50 text-red-700',
};
function PatientCard({ patient, onRefresh }) {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  

  const initials = patient.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 text-sm font-medium flex items-center justify-center flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-medium text-gray-800">{patient.name}</p>
          <p className="text-xs text-gray-400">
            DOB: {patient.date_of_birth ? String(patient.date_of_birth).slice(0, 10) : '—'}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {patient.tags?.map(t => (
          <span key={t} className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
            {t}
          </span>
        ))}
      </div>

      {/* Media list */}
      <p className="text-xs font-medium text-gray-400 mb-2">Media</p>
      <div className="space-y-2 mb-3">
        {media.map(m => (
          <div key={m.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
            {m.thumbnail_path
              ? <img src={`http://localhost:4000/uploads/${m.thumbnail_path.split('/').pop()}`}
                  className="w-9 h-9 rounded object-cover flex-shrink-0" alt="" />
              : <div className="w-9 h-9 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                  {m.mimetype?.startsWith('video') ? '▶' : '🖼'}
                </div>
            }
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 truncate">{m.filename}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[m.status]}`}>
                {m.status}
              </span>
            </div>
          </div>
        ))}
        {media.length === 0 && <p className="text-xs text-gray-300 py-1">No media yet</p>}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <label className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 flex items-center gap-1">
          {uploading ? 'Uploading...' : '+ Upload media'}
          <input type="file" hidden accept="image/*,video/*"  />
        </label>
      </div>
    </div>
  );
}

export default PatientCard;