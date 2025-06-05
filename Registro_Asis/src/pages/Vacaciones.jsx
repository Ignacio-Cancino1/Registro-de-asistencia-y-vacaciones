import { useState } from 'react';
import VacacionesTable from '../components/VacacionesTable';
import VacacionesForm from '../components/VacacionesForm';

export default function Vacaciones() {
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, nombre: 'Juan Pérez', fechaInicio: '2025-06-10', fechaFin: '2025-06-14', estado: 'Pendiente' },
    { id: 2, nombre: 'Laura Díaz', fechaInicio: '2025-07-01', fechaFin: '2025-07-07', estado: 'Aprobada' },
    { id: 3, nombre: 'Carlos Soto', fechaInicio: '2025-06-20', fechaFin: '2025-06-22', estado: 'Pendiente' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  const agregarSolicitud = (nueva) => {
    setSolicitudes([
      ...solicitudes,
      { ...nueva, id: Date.now(), estado: 'Pendiente' },
    ]);
  };

  const actualizarEstado = (id, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideNombre = s.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado === '' || s.estado === filtroEstado;
    const coincideFecha =
      filtroFecha === '' ||
      s.fechaInicio === filtroFecha ||
      s.fechaFin === filtroFecha;
    return coincideNombre && coincideEstado && coincideFecha;
  });

  return (
    <div>
      <h1>Solicitudes de Vacaciones</h1>

      {/* Filtros */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Aprobada">Aprobada</option>
          <option value="Rechazada">Rechazada</option>
        </select>
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </div>

      {/* Botón y formulario */}
      <button onClick={() => setMostrarFormulario(true)}>
        ➕ Solicitar Vacaciones
      </button>

      {mostrarFormulario && (
        <VacacionesForm
          onAgregar={agregarSolicitud}
          onClose={() => setMostrarFormulario(false)}
        />
      )}

      <VacacionesTable
        solicitudes={solicitudesFiltradas}
        onActualizarEstado={actualizarEstado}
      />
    </div>
  );
}
