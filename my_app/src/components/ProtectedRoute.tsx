import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../stores/auth';

export default function ProtectedRoute() {
  const authed = !!useAuth((s) => s.token);
  return authed ? <Outlet /> : <Navigate to="/login" replace />;
}
