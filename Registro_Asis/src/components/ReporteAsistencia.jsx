import React, { useState, useEffect } from 'react';
import API from '../services/api';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../pages/Reportes.css';


export default function ReporteAsistencia() {
  const [datos, setDatos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [filtros, setFiltros] = useState({
    mes: '',
    empleado_id: '',
    fecha_inicio: null,
    fecha_fin: null,
  });

  const fetchAsistencias = async () => {
    try {
      const params = {};
      if (filtros.empleado_id) params.empleado_id = filtros.empleado_id;
      if (filtros.fecha_inicio) params.fecha_inicio = filtros.fecha_inicio.toISOString().split('T')[0];
      if (filtros.fecha_fin) params.fecha_fin = filtros.fecha_fin.toISOString().split('T')[0];

      const res = await API.get('/reportes/asistencias', { params });
      setDatos(res.data);
    } catch (err) {
      console.error('Error al cargar asistencias:', err);
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
    fetchAsistencias();
  }, [filtros]);

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      datos.map(d => ({
        ...d,
        fecha: new Date(d.fecha).toLocaleDateString(),
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Asistencia');
    XLSX.writeFile(wb, 'reporte_asistencia.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte Mensual de Asistencia', 14, 15);
    const columnas = ['Empleado', 'Fecha', 'Entrada', 'Salida', 'Horas trabajadas'];
    const filas = datos.map(d => [
      d.nombre_empleado,
      new Date(d.fecha).toLocaleDateString(),
      d.hora_entrada,
      d.hora_salida,
      d.horas_trabajadas,
    ]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 25,
      theme: 'striped',
    });

    doc.save('reporte_asistencia.pdf');
  };

  return (
    <div>
      <h3>Reporte Mensual de Asistencia</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label>Empleado: </label>
        <select
          value={filtros.empleado_id}
          onChange={(e) => setFiltros({ ...filtros, empleado_id: e.target.value })}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Todos</option>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>

        <label>Desde: </label>
        <DatePicker
          selected={filtros.fecha_inicio}
          onChange={date => setFiltros({ ...filtros, fecha_inicio: date })}
          dateFormat="yyyy-MM-dd"
          isClearable
          placeholderText="Inicio"
          style={{ marginRight: '1rem' }}
        />

        <label>Hasta: </label>
        <DatePicker
          selected={filtros.fecha_fin}
          onChange={date => setFiltros({ ...filtros, fecha_fin: date })}
          dateFormat="yyyy-MM-dd"
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
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Horas trabajadas</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.nombre_empleado}</td>
              <td>{new Date(d.fecha).toLocaleDateString()}</td>
              <td>{d.hora_entrada}</td>
              <td>{d.hora_salida}</td>
              <td>{d.horas_trabajadas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
