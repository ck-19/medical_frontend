export function logout(navigate) {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  navigate('/login', { replace: true });
}
