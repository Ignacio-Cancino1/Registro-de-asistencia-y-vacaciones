export default function VacacionesTable({ solicitudes, onActualizarEstado, esAdmin }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Estado</th>
          {esAdmin && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {solicitudes.map((sol) => (
          <tr key={sol.id}>
            <td>{sol.nombre || sol.empleado_id}</td>
            <td>{sol.fecha_inicio}</td>
            <td>{sol.fecha_fin}</td>
            <td>{sol.estado}</td>
            {esAdmin && sol.estado === 'pendiente' && (
              <td>
                <button onClick={() => onActualizarEstado(sol.id, 'aprobado')}>✅</button>
                <button onClick={() => onActualizarEstado(sol.id, 'rechazado')}>❌</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
