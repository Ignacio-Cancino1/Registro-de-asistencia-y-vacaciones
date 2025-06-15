import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/useAuth';
import VacacionesForm from '../components/VacacionesForm';
import VacacionesTable from '../components/VacacionesTable';

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
        fecha_inicio: datos.fechaInicio,
        fecha_fin: datos.fechaFin,
        ...(rol === 'admin' && { empleado_id: datos.empleado_id }),
      };

      const endpoint = rol === 'admin' ? '/vacaciones' : '/solicitar-vacaciones';
      const res = await API.post(endpoint, payload);

      // Como admin no devuelve el objeto, solo mensaje, puedes hacer otro GET si es necesario
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
    <div>
      <h2>Solicitudes de Vacaciones</h2>

      <button onClick={() => setMostrarFormulario(true)}>
        ➕ {rol === 'admin' ? 'Registrar Solicitud' : 'Solicitar Vacaciones'}
      </button>

      {mostrarFormulario && (
        <VacacionesForm
          onSubmit={handleSolicitud}
          onClose={() => setMostrarFormulario(false)}
          esAdmin={rol === 'admin'}
        />
      )}

      <VacacionesTable
        solicitudes={solicitudes}
        onActualizarEstado={actualizarEstado}
        esAdmin={rol === 'admin'}
      />
    </div>
  );
}
