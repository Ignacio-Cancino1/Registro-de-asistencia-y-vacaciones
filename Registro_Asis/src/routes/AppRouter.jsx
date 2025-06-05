import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Empleados from '../pages/Empleados';
import Asistencia from '../pages/Asistencia';
import Vacaciones from '../pages/Vacaciones';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import './AppRouter.css';
import PrivateRoute from './PrivateRoute';

function AppLayout() {
  const location = useLocation();
  const hideNavbarPaths = ['/'];

  return (
    <div className="app-container">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/empleados"
            element={
              <PrivateRoute>
                <Empleados />
              </PrivateRoute>
            }
          />
          <Route
            path="/asistencia"
            element={
              <PrivateRoute>
                <Asistencia />
              </PrivateRoute>
            }
          />
          <Route
            path="/vacaciones"
            element={
              <PrivateRoute>
                <Vacaciones />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
