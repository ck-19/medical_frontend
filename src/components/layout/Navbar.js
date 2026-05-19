import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const roleConfig = {
  admin: {
    badge: 'Admin',
    badgeClass: 'bg-red-50 text-red-700 border-red-200',
    avatar: 'AD',
    avatarClass: 'bg-red-50 text-red-700',
  },
  doctor: {
    badge: 'Doctor',
    badgeClass: 'border-gray-200 text-gray-500',
    avatar: 'DR',
    avatarClass: 'bg-blue-50 text-blue-700',
  },
};

function Navbar({ role = 'doctor', title = 'MedDash' }) {
  const navigate = useNavigate();
  const config = roleConfig[role] || roleConfig.doctor;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
      <span className="font-medium text-gray-800">{title}</span>
      <div className="flex items-center gap-3">
        <span className={`text-xs border rounded-full px-3 py-1 ${config.badgeClass}`}>
          {config.badge}
        </span>
        <div
          className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center ${config.avatarClass}`}>
          {config.avatar}
        </div>
        <button
          type="button"
          onClick={() => logout(navigate)}
          className="text-sm text-gray-500 hover:text-gray-800">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
