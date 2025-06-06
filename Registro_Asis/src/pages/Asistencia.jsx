import { useState } from 'react';
import { useAuth } from '../context/useAuth';

export default function Asistencia() {
  const [asistencias, setAsistencias] = useState([
    { id: 1, fecha: '2025-06-01', hora: '08:00', observacion: 'Entrada' },
    { id: 2, fecha: '2025-06-01', hora: '18:00', observacion: 'Salida' },
  ]);

  const { rol } = useAuth();

  const handleEliminar = (id) => {
    setAsistencias(asistencias.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2>Registros de Asistencia</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Observación</th>
            {rol === 'admin' && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {asistencias.map((a) => (
            <tr key={a.id}>
              <td>{a.fecha}</td>
              <td>{a.hora}</td>
              <td>{a.observacion}</td>
              {rol === 'admin' && (
                <td>
                  <button onClick={() => handleEliminar(a.id)}>Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}