import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { isAuthenticated, rol, logout } = useAuth();
  const navigate = useNavigate(); // 👈 Importante para redirigir

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();             // Limpia el contexto
    navigate('/login');   // Redirige al login
  };

  return (
    <nav style={{ background: '#333', padding: '1rem' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', color: 'white' }}>
        <li><Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link></li>

        {rol === 'admin' && (
          <>
            <li><Link to="/empleados" style={{ color: 'white' }}>Empleados</Link></li>
            <li><Link to="/asistencia" style={{ color: 'white' }}>Asistencia</Link></li>
            <li><Link to="/vacaciones" style={{ color: 'white' }}>Vacaciones</Link></li>
            <li><Link to="/reportes" style={{ color: 'white' }}>Reportes</Link></li>
          </>
        )}

        {rol === 'empleado' && (
          <>
            <li><Link to="/mi-asistencia" style={{ color: 'white' }}>Mi Asistencia</Link></li>
            <li><Link to="/mis-vacaciones" style={{ color: 'white' }}>Mis Vacaciones</Link></li>
          </>
        )}

        <li>
          <button
            onClick={handleLogout}
            style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem' }}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}
