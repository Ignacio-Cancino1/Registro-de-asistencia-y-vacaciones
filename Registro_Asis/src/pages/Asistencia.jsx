import { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/useAuth';
import AsistenciaForm from '../components/AsistenciaForm';
import AsistenciaTable from '../components/AsistenciaTable';
import './Asistencia.css'; // ✅ Asegúrate de que este archivo exista en /pages

export default function Asistencia() {
  const [asistencias, setAsistencias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { rol } = useAuth();

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const res =
          rol === 'admin'
            ? await API.get('/asistencias')
            : await API.get('/mis-asistencias');
        setAsistencias(res.data);
      } catch (err) {
        console.error('Error al cargar asistencias:', err);
      }
    };
    fetchAsistencias();
  }, [rol]);

  const handleAgregar = async (registro) => {
    try {
      const payload = {
        fecha: registro.fecha,
        hora_entrada: registro.horaEntrada,
        hora_salida: registro.horaSalida,
        ...(rol === 'admin' && { empleado_id: registro.empleado_id }),
      };

      const res =
        rol === 'admin'
          ? await API.post('/asistencias', payload)
          : await API.post('/mis-asistencias', payload);

      setAsistencias((prev) => [...prev, res.data]);
      setMostrarFormulario(false);
    } catch (err) {
      console.error('Error al registrar asistencia:', err);
    }
  };

  const handleEliminar = async (id) => {
    const confirmado = window.confirm('¿Eliminar esta asistencia?');
    if (confirmado) {
      try {
        await API.delete(`/asistencias/${id}`);
        setAsistencias((prev) => prev.filter((a) => a.id !== id));
      } catch (err) {
        console.error('Error al eliminar:', err);
      }
    }
  };

  return (
    <div className="asistencia-container">
      <h2>Registros de Asistencia</h2>

      <button className="btn-add" onClick={() => setMostrarFormulario(true)}>
        ➕ Registrar Asistencia
      </button>

      {mostrarFormulario && (
        <AsistenciaForm
          onAgregar={handleAgregar}
          onClose={() => setMostrarFormulario(false)}
          esAdmin={rol === 'admin'}
        />
      )}

      <AsistenciaTable
        registros={asistencias}
        onEliminar={handleEliminar}
        esAdmin={rol === 'admin'}
      />
    </div>
  );
}
