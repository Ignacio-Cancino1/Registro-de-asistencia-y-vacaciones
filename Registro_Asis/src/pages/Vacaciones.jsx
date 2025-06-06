import { useState } from 'react';
import { useAuth } from '../context/useAuth';

export default function Vacaciones() {
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, empleado: 'Juan', inicio: '2025-06-10', fin: '2025-06-15', estado: 'Pendiente' },
    { id: 2, empleado: 'Ana', inicio: '2025-07-01', fin: '2025-07-05', estado: 'Aprobada' },
  ]);

  const { rol } = useAuth();

  const aprobarSolicitud = (id) => {
    setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, estado: 'Aprobada' } : s));
  };

  const rechazarSolicitud = (id) => {
    setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, estado: 'Rechazada' } : s));
  };

  return (
    <div>
      <h2>Solicitudes de Vacaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            {rol === 'admin' && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.id}>
              <td>{s.empleado}</td>
              <td>{s.inicio}</td>
              <td>{s.fin}</td>
              <td>{s.estado}</td>
              {rol === 'admin' && (
                <td>
                  <button onClick={() => aprobarSolicitud(s.id)}>Aprobar</button>
                  <button onClick={() => rechazarSolicitud(s.id)}>Rechazar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
