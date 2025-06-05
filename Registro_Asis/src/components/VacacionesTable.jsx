export default function VacacionesTable({ solicitudes, onActualizarEstado }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {solicitudes.map((sol) => (
          <tr key={sol.id}>
            <td>{sol.nombre}</td>
            <td>{sol.fechaInicio}</td>
            <td>{sol.fechaFin}</td>
            <td>{sol.estado}</td>
            <td>
              {sol.estado === 'Pendiente' && (
                <>
                  <button onClick={() => onActualizarEstado(sol.id, 'Aprobada')}>✅ Aprobar</button>{' '}
                  <button onClick={() => onActualizarEstado(sol.id, 'Rechazada')}>❌ Rechazar</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
