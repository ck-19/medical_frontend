import { formatDate } from '../utils/date';

function PatientCard({ patient}) {

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
            DOB: {formatDate(patient.date_of_birth)}
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
    </div>
  );
}

export default PatientCard;