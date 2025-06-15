import { useState, useEffect } from 'react';
import API from '../services/api';

export default function VacacionesForm({ onSubmit, onClose, esAdmin }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [empleadoId, setEmpleadoId] = useState('');
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    if (esAdmin) {
      API.get('/empleados').then(res => setEmpleados(res.data)).catch(err => console.error(err));
    }
  }, [esAdmin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fechaInicio, fechaFin, empleado_id: empleadoId });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Formulario de Vacaciones</h3>
        <form onSubmit={handleSubmit}>
          {esAdmin && (
            <select required value={empleadoId} onChange={(e) => setEmpleadoId(e.target.value)}>
              <option value="">Seleccionar empleado</option>
              {empleados.map((e) => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          )}

          <input type="date" required value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          <input type="date" required value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Enviar</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
