export default function AsistenciaTable({ registros, onEliminar, esAdmin }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora Entrada</th>
          <th>Hora Salida</th>
          {esAdmin && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {registros.map((item) => (
          <tr key={item.id}>
            <td>{item.fecha}</td>
            <td>{item.hora_entrada}</td>
            <td>{item.hora_salida}</td>
            {esAdmin && (
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => onEliminar(item.id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
