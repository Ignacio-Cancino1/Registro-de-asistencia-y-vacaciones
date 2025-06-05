import { useState } from 'react';
import EmpleadoTable from '../components/EmpleadoTable';
import EmpleadoForm from '../components/EmpleadoForm';

export default function Empleados() {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Juan Pérez', cargo: 'Analista', estado: 'Activo' },
    { id: 2, nombre: 'Laura Díaz', cargo: 'Diseñadora', estado: 'Inactivo' },
    { id: 3, nombre: 'Carlos Soto', cargo: 'Desarrollador', estado: 'Activo' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  const agregarOEditarEmpleado = (empleado) => {
    setEmpleados((prev) => {
      const existe = prev.find((e) => e.id === empleado.id);
      if (existe) {
        return prev.map((e) => (e.id === empleado.id ? empleado : e));
      } else {
        return [...prev, empleado];
      }
    });
  };

  const eliminarEmpleado = (id) => {
    const confirmado = window.confirm('¿Deseas eliminar este empleado?');
    if (confirmado) {
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const abrirFormularioAgregar = () => {
    setEmpleadoEditando(null);
    setMostrarFormulario(true);
  };

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
