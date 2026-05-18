import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import AdminDashboard from './page/AdminDashboard';

function PrivateRoute() {
  const token = localStorage.getItem('token');
  if (!token || token === 'undefined' || token === 'null') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function AdminRoute() {
  const role = localStorage.getItem('role');
  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: '14px' },
          success: { style: { background: '#f0fdf4', color: '#166534' } },
          error: { style: { background: '#fef2f2', color: '#991b1b' } },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
