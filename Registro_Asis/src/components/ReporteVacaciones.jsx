import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../services/api';

export default function ReporteVacaciones() {
  const [datos, setDatos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState('Todos');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('Todos');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resVacaciones, resEmpleados] = await Promise.all([
          API.get('/reportes/vacaciones'),
          API.get('/empleados')
        ]);
        setDatos(resVacaciones.data);
        setEmpleados(resEmpleados.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, []);

  const datosFiltrados = datos.filter((d) => {
    const fecha = new Date(d.fecha_inicio);
    const nombreEmpleado = empleados.find(e => e.id === d.empleado_id)?.nombre || 'Desconocido';

    const coincideEmpleado =
      empleadoSeleccionado === 'Todos' ||
      nombreEmpleado === empleadoSeleccionado;

    const coincideMes =
      mesSeleccionado === 'Todos' ||
      fecha.toLocaleString('default', { month: 'long' }) === mesSeleccionado;

    const coincideFecha =
      (!fechaInicio || fecha >= fechaInicio) &&
      (!fechaFin || fecha <= fechaFin);

    return coincideEmpleado && coincideMes && coincideFecha;
  });

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      datosFiltrados.map(d => {
        const empleado = empleados.find(e => e.id === d.empleado_id)?.nombre || 'Desconocido';
        return {
          Empleado: empleado,
          'Fecha Inicio': new Date(d.fecha_inicio).toLocaleDateString(),
          'Fecha Fin': new Date(d.fecha_fin).toLocaleDateString(),
          Estado: d.estado
        };
      })
    );
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Vacaciones');
    XLSX.writeFile(wb, 'reporte_vacaciones.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Vacaciones', 14, 15);
    const columnas = ['Empleado', 'Fecha Inicio', 'Fecha Fin', 'Estado'];
    const filas = datosFiltrados.map(d => [
      empleados.find(e => e.id === d.empleado_id)?.nombre || 'Desconocido',
      new Date(d.fecha_inicio).toLocaleDateString(),
      new Date(d.fecha_fin).toLocaleDateString(),
      d.estado
    ]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 25,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save('reporte_vacaciones.pdf');
  };

  const mesesUnicos = [...new Set(datos.map(d =>
    new Date(d.fecha_inicio).toLocaleString('default', { month: 'long' })
  ))];

  const nombresEmpleados = empleados.map(e => e.nombre);

  return (
    <div>
      <h3>Reporte de Vacaciones</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label>Mes: </label>
        <select value={mesSeleccionado} onChange={e => setMesSeleccionado(e.target.value)} style={{ marginRight: '1rem' }}>
          <option value="Todos">Todos</option>
          {mesesUnicos.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

        <label>Empleado: </label>
        <select value={empleadoSeleccionado} onChange={e => setEmpleadoSeleccionado(e.target.value)} style={{ marginRight: '1rem' }}>
          <option value="Todos">Todos</option>
          {nombresEmpleados.map((e, i) => (
            <option key={i} value={e}>{e}</option>
          ))}
        </select>

        <label>Desde: </label>
        <DatePicker
          selected={fechaInicio}
          onChange={date => setFechaInicio(date)}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Inicio"
          style={{ marginRight: '1rem' }}
        />

        <label>Hasta: </label>
        <DatePicker
          selected={fechaFin}
          onChange={date => setFechaFin(date)}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Fin"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={exportarExcel} style={{ marginRight: '1rem' }}>Exportar a Excel</button>
        <button onClick={exportarPDF}>Exportar a PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((d, i) => {
            const empleado = empleados.find(e => e.id === d.empleado_id)?.nombre || 'Desconocido';
            return (
              <tr key={i}>
                <td>{empleado}</td>
                <td>{new Date(d.fecha_inicio).toLocaleDateString()}</td>
                <td>{new Date(d.fecha_fin).toLocaleDateString()}</td>
                <td>{d.estado}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
