import React, { useEffect, useState } from 'react';
import API from '../services/api';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReporteCumplimiento() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoId, setEmpleadoId] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [datos, setDatos] = useState([]);

  // Obtener lista de empleados
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

  // Buscar cumplimiento desde backend
  const buscarCumplimiento = async () => {
    if (!empleadoId || !fechaInicio || !fechaFin) {
      alert('Completa todos los campos');
      return;
    }

    try {
      const res = await API.get('/reportes/cumplimiento', {
        params: {
          empleado_id: empleadoId,
          fecha_inicio: fechaInicio.toISOString().split('T')[0],
          fecha_fin: fechaFin.toISOString().split('T')[0],
        },
      });
      setDatos(res.data);
    } catch (err) {
      console.error('Error al cargar cumplimiento:', err);
    }
  };

  // Exportar a Excel
  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Cumplimiento');
    XLSX.writeFile(wb, 'reporte_cumplimiento.xlsx');
  };

  // Exportar a PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Cumplimiento de Horario', 14, 15);
    autoTable(doc, {
      head: [['Fecha', 'Entrada', 'Salida', 'Horas', 'Cumple']],
      body: datos.map(d => [
        d.fecha,
        d.hora_entrada || '-',
        d.hora_salida || '-',
        d.horas_trabajadas,
        d.cumple_jornada
      ]),
      startY: 25,
      theme: 'striped',
    });
    doc.save('reporte_cumplimiento.pdf');
  };

  return (
    <div>
      <h3>Reporte de Cumplimiento de Horario</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label>Empleado: </label>
        <select
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Seleccione</option>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>

        <label>Desde: </label>
        <DatePicker
          selected={fechaInicio}
          onChange={setFechaInicio}
          dateFormat="yyyy-MM-dd"
          placeholderText="Inicio"
          style={{ marginRight: '1rem' }}
        />

        <label>Hasta: </label>
        <DatePicker
          selected={fechaFin}
          onChange={setFechaFin}
          dateFormat="yyyy-MM-dd"
          placeholderText="Fin"
        />

        <button onClick={buscarCumplimiento} style={{ marginLeft: '1rem' }}>
          Buscar
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={exportarExcel} style={{ marginRight: '1rem' }}>Exportar a Excel</button>
        <button onClick={exportarPDF}>Exportar a PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora Entrada</th>
            <th>Hora Salida</th>
            <th>Horas Trabajadas</th>
            <th>¿Cumple Jornada?</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.fecha}</td>
              <td>{d.hora_entrada || '-'}</td>
              <td>{d.hora_salida || '-'}</td>
              <td>{d.horas_trabajadas}</td>
              <td>{d.cumple_jornada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
