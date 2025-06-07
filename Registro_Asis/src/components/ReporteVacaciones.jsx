import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReporteVacaciones() {
  const todosLosDatos = [
    { empleado: 'Juan', mes: 'Enero', fecha: new Date(2024, 0, 3), diasTomados: 2 },
    { empleado: 'Ana', mes: 'Enero', fecha: new Date(2024, 0, 10), diasTomados: 1 },
    { empleado: 'Carlos', mes: 'Febrero', fecha: new Date(2024, 1, 5), diasTomados: 3 },
    { empleado: 'Juan', mes: 'Febrero', fecha: new Date(2024, 1, 15), diasTomados: 1 },
    { empleado: 'Ana', mes: 'Marzo', fecha: new Date(2024, 2, 1), diasTomados: 4 },
  ];

  const [mesSeleccionado, setMesSeleccionado] = useState('Todos');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('Todos');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const datosFiltrados = todosLosDatos.filter(d => {
    const coincideMes = mesSeleccionado === 'Todos' || d.mes === mesSeleccionado;
    const coincideEmpleado = empleadoSeleccionado === 'Todos' || d.empleado === empleadoSeleccionado;
    const coincideFecha =
      (!fechaInicio || d.fecha >= fechaInicio) &&
      (!fechaFin || d.fecha <= fechaFin);

    return coincideMes && coincideEmpleado && coincideFecha;
  });

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosFiltrados.map(d => ({
      ...d,
      fecha: d.fecha.toLocaleDateString()
    })));
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Vacaciones');
    XLSX.writeFile(wb, 'reporte_vacaciones.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Vacaciones', 14, 15);
    const columnas = ['Empleado', 'Mes', 'Fecha', 'Días Tomados'];
    const filas = datosFiltrados.map(d => [d.empleado, d.mes, d.fecha.toLocaleDateString(), d.diasTomados]);

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 25,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('reporte_vacaciones.pdf');
  };

  const mesesUnicos = [...new Set(todosLosDatos.map(d => d.mes))];
  const empleadosUnicos = [...new Set(todosLosDatos.map(d => d.empleado))];

  return (
    <div>
      <h3>Reporte de Vacaciones</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label>Mes: </label>
        <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)} style={{ marginRight: '1rem' }}>
          <option value="Todos">Todos</option>
          {mesesUnicos.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

        <label>Empleado: </label>
        <select value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)} style={{ marginRight: '1rem' }}>
          <option value="Todos">Todos</option>
          {empleadosUnicos.map((e, i) => (
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
            <th>Mes</th>
            <th>Fecha</th>
            <th>Días Tomados</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((d, i) => (
            <tr key={i}>
              <td>{d.empleado}</td>
              <td>{d.mes}</td>
              <td>{d.fecha.toLocaleDateString()}</td>
              <td>{d.diasTomados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
