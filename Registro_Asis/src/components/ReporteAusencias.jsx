// src/components/ReporteAusencias.jsx
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../services/api';

export default function ReporteAusencias() {
  const [empleadoId, setEmpleadoId] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [ausencias, setAusencias] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await API.get('/empleados');
        setEmpleados(res.data);
      } catch (err) {
        console.error('Error cargando empleados:', err);
      }
    };
    fetchEmpleados();
  }, []);

  const cargarAusencias = async () => {
    if (!empleadoId || !fechaInicio || !fechaFin) {
      alert('Selecciona un empleado y rango de fechas');
      return;
    }

    try {
      const params = {
        empleado_id: empleadoId,
        fecha_inicio: fechaInicio.toISOString().split('T')[0],
        fecha_fin: fechaFin.toISOString().split('T')[0],
      };
      const res = await API.get('/reportes/ausencias', { params });
      setAusencias(res.data.ausencias || []);
    } catch (err) {
      console.error('Error cargando ausencias:', err);
    }
  };

  const exportarExcel = () => {
    const datos = ausencias.map(fecha => ({ Fecha: fecha }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Ausencias');
    XLSX.writeFile(wb, 'reporte_ausencias.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Ausencias', 14, 15);
    autoTable(doc, {
      head: [['Fecha de Ausencia']],
      body: ausencias.map(f => [f]),
      startY: 25,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });
    doc.save('reporte_ausencias.pdf');
  };

  return (
    <div>
      <h3>Reporte de Ausencias</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label>Empleado: </label>
        <select
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">Seleccione</option>
          {empleados.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.nombre}
            </option>
          ))}
        </select>

        <label>Desde: </label>
        <DatePicker
          selected={fechaInicio}
          onChange={setFechaInicio}
          dateFormat="yyyy-MM-dd"
          placeholderText="Fecha de inicio"
        />

        <label style={{ marginLeft: '1rem' }}>Hasta: </label>
        <DatePicker
          selected={fechaFin}
          onChange={setFechaFin}
          dateFormat="yyyy-MM-dd"
          placeholderText="Fecha de fin"
        />

        <button onClick={cargarAusencias} style={{ marginLeft: '1rem' }}>
          Buscar
        </button>
      </div>

      {ausencias.length > 0 && (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={exportarExcel} style={{ marginRight: '1rem' }}>
              Exportar a Excel
            </button>
            <button onClick={exportarPDF}>Exportar a PDF</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Fecha de Ausencia</th>
              </tr>
            </thead>
            <tbody>
              {ausencias.map((f, i) => (
                <tr key={i}>
                  <td>{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
