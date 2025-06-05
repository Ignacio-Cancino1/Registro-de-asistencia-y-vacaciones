export default function AsistenciaTable({ registros, onEliminar }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Fecha</th>
          <th>Hora Entrada</th>
          <th>Hora Salida</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((item, index) => (
          <tr key={index}>
            <td>{item.nombre}</td>
            <td>{item.fecha}</td>
            <td>{item.horaEntrada}</td>
            <td>{item.horaSalida}</td>
            <td>
              <button onClick={() => onEliminar(index)}>🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
