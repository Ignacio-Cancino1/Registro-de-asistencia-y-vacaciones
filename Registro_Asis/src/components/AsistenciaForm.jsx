import { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/useAuth';
import './AsistenciaForm.css';

export default function AsistenciaForm({ onAgregar, onClose }) {
  const [fecha, setFecha] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [empleadoId, setEmpleadoId] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const { rol } = useAuth();

  useEffect(() => {
    if (rol === 'admin') {
      API.get('/empleados')
        .then((res) => setEmpleados(res.data))
        .catch((err) => console.error('Error al cargar empleados:', err));
    }
  }, [rol]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoRegistro = {
      fecha,
      horaEntrada,
      horaSalida,
      ...(rol === 'admin' && { empleado_id: empleadoId }),
    };

    onAgregar(nuevoRegistro);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Registrar Asistencia</h2>
        <form onSubmit={handleSubmit}>
          {rol === 'admin' && (
            <select
              value={empleadoId}
              onChange={(e) => setEmpleadoId(e.target.value)}
              required
            >
              <option value="">Seleccionar Empleado</option>
              {empleados.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          )}

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
