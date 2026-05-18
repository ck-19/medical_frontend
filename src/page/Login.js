import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginusers } from '../api/Api';

function Login() {
  const navigate = useNavigate();
const [formdata,setFormdata] = useState({
  email: '',
  password: '',
});
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
   const {name,value} = e.target;
   setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await loginusers({
        email: formdata.email.trim(),
        password: formdata.password.trim(),
      });
      localStorage.setItem('token', result.token);
      const role = JSON.parse(atob(result.token.split('.')[1])).role;
      localStorage.setItem('role', role);
      navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm">
        <h2 className="text-lg font-medium mb-1">Sign in</h2>
        <p className="text-sm text-gray-400 mb-6">Medical Dashboard</p>

        {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Email</label>
            <input type="email" name="email" value={formdata.email} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formdata.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;