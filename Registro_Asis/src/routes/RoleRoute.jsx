import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function RoleRoute({ children, rolRequerido }) {
  const { isAuthenticated, rol } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" />;
  if (rol !== rolRequerido) return <Navigate to="/dashboard" />;

  return children;
}
