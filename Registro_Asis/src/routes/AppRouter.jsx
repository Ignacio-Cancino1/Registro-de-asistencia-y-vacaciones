import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Empleados from '../pages/Empleados';
import Vacaciones from '../pages/Vacaciones';
import Asistencia from '../pages/Asistencia';
import Reportes from '../pages/Reportes';

import Navbar from '../components/Navbar';
import RoleRoute from './RoleRoute';

function AppLayout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin */}
          <Route path="/empleados" element={
            <RoleRoute rolRequerido="admin">
              <Empleados />
            </RoleRoute>
          }/>
          <Route path="/asistencia" element={
            <RoleRoute rolRequerido="admin">
              <Asistencia />
            </RoleRoute>
          }/>
          <Route path="/vacaciones" element={
            <RoleRoute rolRequerido="admin">
              <Vacaciones />
            </RoleRoute>
          }/>
          <Route path="/reportes" element={
            <RoleRoute rolRequerido="admin">
              <Reportes />
            </RoleRoute>
          }/>

          {/* Empleado */}
          <Route path="/mi-asistencia" element={
            <RoleRoute rolRequerido="empleado">
              <Asistencia />
            </RoleRoute>
          }/>
          <Route path="/mis-vacaciones" element={
            <RoleRoute rolRequerido="empleado">
              <Vacaciones />
            </RoleRoute>
          }/>

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
