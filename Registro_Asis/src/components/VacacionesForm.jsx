import { useState } from 'react';
import './VacacionesForm.css';

export default function VacacionesForm({ onGuardar, onClose }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Solicitar Vacaciones</h2>
        <form onSubmit={handleSubmit}>
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
          <div>
            <button type="submit">Enviar solicitud</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
