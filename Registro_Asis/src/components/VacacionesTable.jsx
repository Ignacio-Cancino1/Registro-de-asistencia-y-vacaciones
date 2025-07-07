import './VacacionesTable.css';

export default function VacacionesTable({ vacaciones, esAdmin, onActualizarEstado }) {
  return (
    <table className="vacaciones-table">
      <thead>
        <tr>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {vacaciones.map((vac) => (
          <tr key={vac.id}>
            <td>{vac.fecha_inicio}</td>
            <td>{vac.fecha_fin}</td>
            <td>{vac.estado}</td>
            <td>
              {esAdmin && vac.estado === 'pendiente' ? (
                <div className="acciones-btns">
                  <button
                    className="btn-aprobar"
                    onClick={() => onActualizarEstado(vac.id, 'aprobado')}
                  >
                    ✅ Aprobar
                  </button>
                  <button
                    className="btn-rechazar"
                    onClick={() => onActualizarEstado(vac.id, 'rechazado')}
                  >
                    ❌ Rechazar
                  </button>
                </div>
              ) : (
                '—'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
