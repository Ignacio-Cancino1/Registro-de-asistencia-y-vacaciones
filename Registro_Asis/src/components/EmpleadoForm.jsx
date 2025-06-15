import { useState, useEffect } from 'react';
import './EmpleadoForm.css';

export default function EmpleadoForm({ onGuardar, onClose, empleadoEditando }) {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [estado, setEstado] = useState('Activo');

  useEffect(() => {
    if (empleadoEditando) {
      setNombre(empleadoEditando.nombre);
      setCargo(empleadoEditando.cargo);
      setEstado(empleadoEditando.estado);
    }
  }, [empleadoEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const empleadoData = {
      nombre,
      cargo,
      estado,
    };
    if (empleadoEditando?.id) {
      empleadoData.id = empleadoEditando.id;
    }
    onGuardar(empleadoData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{empleadoEditando ? 'Editar' : 'Agregar'} Empleado</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">{empleadoEditando ? 'Guardar cambios' : 'Agregar'}</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
