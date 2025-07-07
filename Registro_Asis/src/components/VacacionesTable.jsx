import './VacacionesTable.css';

export default function VacacionesTable({ vacaciones, esAdmin, onActualizarEstado }) {
  return (
    <table className="vacaciones-table">
      <thead>
        <tr>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          {esAdmin && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {vacaciones.map((v) => (
          <tr key={v.id}>
            <td>{v.fecha_inicio}</td>
            <td>{v.fecha_fin}</td>
            <td>{v.estado}</td>
            {esAdmin && (
              <td>
                {v.estado === 'Pendiente' ? (
                  <>
                    <button
                      className="btn-accion"
                      onClick={() => onActualizarEstado(v.id, 'Aprobado')}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() => onActualizarEstado(v.id, 'Rechazado')}
                    >
                      ❌ Rechazar
                    </button>
                  </>
                ) : (
                  <em>—</em>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
