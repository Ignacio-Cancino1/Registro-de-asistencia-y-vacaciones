import { useState, useEffect } from 'react';
import API from '../services/api';
import EmpleadoTable from '../components/EmpleadoTable';
import EmpleadoForm from '../components/EmpleadoForm';

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  // Obtener empleados al cargar la vista
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await API.get('/empleados');
        setEmpleados(res.data);
      } catch (error) {
        console.error('Error al cargar empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  // Crear o actualizar empleado
  const agregarOEditarEmpleado = async (empleado) => {
    try {
      if (empleado.id) {
        // Editar
        const res = await API.put(`/empleados/${empleado.id}`, empleado);
        setEmpleados((prev) =>
          prev.map((e) => (e.id === empleado.id ? res.data : e))
        );
      } else {
        // Crear
        const res = await API.post('/empleados', empleado);
        setEmpleados((prev) => [...prev, res.data]);
      }

      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al guardar empleado:', error);
    }
  };

  // Eliminar empleado
const eliminarEmpleado = async (id) => {
  const confirmado = window.confirm("¿Deseas eliminar este empleado?");
  if (confirmado) {
    try {
      await API.delete(`/empleados/${id}`);
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  }
};


  // Abrir formulario para agregar
  const abrirFormularioAgregar = () => {
    setEmpleadoEditando(null);
    setMostrarFormulario(true);
  };

  // Abrir formulario para editar
  const abrirFormularioEditar = (empleado) => {
    setEmpleadoEditando(empleado);
    setMostrarFormulario(true);
  };

  return (
    <div>
      <h1>Empleados</h1>
      <button onClick={abrirFormularioAgregar}>➕ Agregar Empleado</button>

      {mostrarFormulario && (
        <EmpleadoForm
          empleadoEditando={empleadoEditando}
          onGuardar={agregarOEditarEmpleado}
          onClose={() => setMostrarFormulario(false)}
        />
      )}

      <EmpleadoTable
        empleados={empleados}
        onEliminar={eliminarEmpleado}
        onEditar={abrirFormularioEditar}
      />
    </div>
  );
}
