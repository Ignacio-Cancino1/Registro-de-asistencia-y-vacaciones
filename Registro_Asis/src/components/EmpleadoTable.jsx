export default function EmpleadoTable({ empleados, onEliminar, onEditar }) {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cargo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id}>
            <td>{empleado.id}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.cargo}</td>
            <td>{empleado.estado}</td>
            <td>
              <button onClick={() => onEditar(empleado)}>✏️ Editar</button>{' '}
              <button onClick={() => onEliminar(empleado.id)}>🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
