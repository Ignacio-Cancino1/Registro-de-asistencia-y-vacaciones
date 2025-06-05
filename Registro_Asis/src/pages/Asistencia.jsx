import { useState } from 'react';
import AsistenciaTable from '../components/AsistenciaTable';
import AsistenciaForm from '../components/AsistenciaForm';

export default function Asistencia() {
  const [registros, setRegistros] = useState([
    { nombre: 'Juan Pérez', fecha: '2025-06-05', horaEntrada: '08:00', horaSalida: '17:00' },
    { nombre: 'Laura Díaz', fecha: '2025-06-05', horaEntrada: '08:30', horaSalida: '17:15' },
    { nombre: 'Carlos Soto', fecha: '2025-06-06', horaEntrada: '08:10', horaSalida: '17:10' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  const agregarRegistro = (nuevo) => {
    setRegistros([...registros, nuevo]);
  };

  const eliminarRegistro = (index) => {
    const confirmado = window.confirm('¿Deseas eliminar este registro de asistencia?');
    if (confirmado) {
      setRegistros((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const registrosFiltrados = registros.filter((reg) => {
    const coincideNombre = reg.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideFecha = filtroFecha === '' || reg.fecha === filtroFecha;
    return coincideNombre && coincideFecha;
  });

  return (
    <div>
      <h1>Registro de Asistencia</h1>

      {/* Filtros */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </div>

      {/* Botón para abrir formulario */}
      <button onClick={() => setMostrarFormulario(true)}>
        ➕ Registrar Asistencia
      </button>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <AsistenciaForm
          onAgregar={agregarRegistro}
          onClose={() => setMostrarFormulario(false)}
        />
      )}

      {/* Tabla con registros filtrados */}
      <AsistenciaTable
        registros={registrosFiltrados}
        onEliminar={eliminarRegistro}
      />
    </div>
  );
}
