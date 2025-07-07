import React, { useState, useEffect } from 'react';
import API from '../services/api';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../pages/Reportes.css'; // ⬅️ Asegúrate de importar los estilos

export default function ReporteVacaciones() {
  const [datos, setDatos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [filtros, setFiltros] = useState({
    empleado_id: '',
    fecha_inicio: null,
    fecha_fin: null,
  });

  const fetchVacaciones = async () => {
    try {
      const params = {};
      if (filtros.empleado_id) params.empleado_id = filtros.empleado_id;
      if (filtros.fecha_inicio) params.fecha_inicio = filtros.fecha_inicio.toISOString().split('T')[0];
      if (filtros.fecha_fin) params.fecha_fin = filtros.fecha_fin.toISOString().split('T')[0];

      const res = await API.get('/reportes/vacaciones', { params });
      setDatos(res.data);
    } catch (err) {
      console.error('Error al cargar vacaciones:', err);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const res = await API.get('/empleados');
      setEmpleados(res.data);
    } catch (err) {
      console.error('Error al cargar empleados:', err);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  useEffect(() => {
    fetchVacaciones();
  }, [filtros]);

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      datos.map(d => ({
        ...d,
        fecha_inicio: new Date(d.fecha_inicio).toLocaleDateString(),
        fecha_fin: new Date(d.fecha_fin).toLocaleDateString(),
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Vacaciones');
    XLSX.writeFile(wb, 'reporte_vacaciones.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Vacaciones', 14, 15);
    const columnas = ['Empleado', 'Fecha Inicio', 'Fecha Fin', 'Estado'];
    const filas = datos.map(d => [
      d.nombre_empleado,
      new Date(d.fecha_inicio).toLocaleDateString(),
      new Date(d.fecha_fin).toLocaleDateString(),
      d.estado,
    ]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 25,
      theme: 'striped',
    });

    doc.save('reporte_vacaciones.pdf');
  };

  return (
    <div className="reporte-container">
      <h3>Reporte de Vacaciones</h3>

      <div className="reporte-filtros">
        <label>Empleado:</label>
        <select
          value={filtros.empleado_id}
          onChange={(e) => setFiltros({ ...filtros, empleado_id: e.target.value })}
        >
          <option value="">Todos</option>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>

        <label>Desde:</label>
        <DatePicker
          selected={filtros.fecha_inicio}
          onChange={(date) => setFiltros({ ...filtros, fecha_inicio: date })}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Inicio"
        />

        <label>Hasta:</label>
        <DatePicker
          selected={filtros.fecha_fin}
          onChange={(date) => setFiltros({ ...filtros, fecha_fin: date })}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Fin"
        />
      </div>

      <div className="reporte-botones">
        <button onClick={exportarExcel}>Exportar a Excel</button>
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
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.nombre_empleado}</td>
              <td>{new Date(d.fecha_inicio).toLocaleDateString()}</td>
              <td>{new Date(d.fecha_fin).toLocaleDateString()}</td>
              <td>{d.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
