import { useState } from 'react';
import './AsistenciaForm.css';

export default function AsistenciaForm({ onAgregar, onClose }) {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSalida, setHoraSalida] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoRegistro = {
      nombre,
      fecha,
      horaEntrada,
      horaSalida,
    };

    onAgregar(nuevoRegistro);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Registrar Asistencia</h2>
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
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
          <input
            type="time"
            value={horaEntrada}
            onChange={(e) => setHoraEntrada(e.target.value)}
            required
          />
          <input
            type="time"
            value={horaSalida}
            onChange={(e) => setHoraSalida(e.target.value)}
            required
          />
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
