import { useState } from 'react';
import './VacacionesForm.css';

export default function VacacionesForm({ onAgregar, onClose }) {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar({ nombre, fechaInicio, fechaFin });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Solicitar Vacaciones</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del empleado"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Enviar solicitud</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
