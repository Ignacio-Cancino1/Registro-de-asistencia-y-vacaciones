import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/empleados', label: 'Empleados' },
    { path: '/asistencia', label: 'Asistencia' },
    { path: '/vacaciones', label: 'Vacaciones' },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">🗂️ Empresa</h2>
      <ul className="menu">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </li>
      </ul>
    </aside>
  );
}
