import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/useAuth';
import VacacionesForm from '../components/VacacionesForm';
import VacacionesTable from '../components/VacacionesTable';
import './Vacaciones.css'; // ← archivo CSS global de la vista

export default function Vacaciones() {
  const { rol } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = rol === 'admin' ? '/vacaciones' : '/mis-vacaciones';
        const res = await API.get(endpoint);
        setSolicitudes(res.data);
      } catch (err) {
        console.error('Error al cargar solicitudes:', err);
      }
    };
    fetchData();
  }, [rol]);

  const handleSolicitud = async (datos) => {
    try {
      const payload = {
        fecha_inicio: datos.fecha_inicio,
        fecha_fin: datos.fecha_fin,
        ...(rol === 'admin' && { empleado_id: datos.empleado_id }),
      };

      const endpoint = rol === 'admin' ? '/vacaciones' : '/solicitar-vacaciones';
      const res = await API.post(endpoint, payload);

      setSolicitudes((prev) => [...prev, res.data || payload]);
      setMostrarFormulario(false);
    } catch (err) {
      console.error('Error al registrar vacaciones:', err);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await API.put(`/vacaciones/${id}`, { estado: nuevoEstado });
      setSolicitudes((prev) =>
        prev.map((sol) => (sol.id === id ? { ...sol, estado: nuevoEstado } : sol))
      );
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    }
  };

  return (
    <div className="vacaciones-container">
      <h2>Solicitudes de Vacaciones</h2>

      <button onClick={() => setMostrarFormulario(true)}>
        ➕ {rol === 'admin' ? 'Registrar Solicitud' : 'Solicitar Vacaciones'}
      </button>

      {mostrarFormulario && (
        <VacacionesForm
          onGuardar={handleSolicitud}
          onClose={() => setMostrarFormulario(false)}
        />
      )}

      <VacacionesTable
        vacaciones={solicitudes}
        esAdmin={rol === 'admin'}
        onActualizarEstado={actualizarEstado}
      />
    </div>
  );
}
