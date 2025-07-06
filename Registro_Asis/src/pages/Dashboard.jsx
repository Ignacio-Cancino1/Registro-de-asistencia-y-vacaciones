import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import API from '../services/api';
import './Dashboard.css'; // 👈 Importa el CSS nuevo

const COLORS = ['#2ecc71', '#e74c3c', '#f1c40f'];

export default function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    API.get('/dashboard/resumen').then(res => setResumen(res.data));
    API.get('/dashboard/eventos').then(res => setEventos(res.data));
    API.get('/dashboard/notificaciones')
      .then(res => setNotificaciones(res.data))
      .catch(() => setNotificaciones([]));
  }, []);

  if (!resumen) return <p>Cargando...</p>;

  const resumenAsistenciaMes = [
    { name: 'Asistencias', value: 120 },
    { name: 'Ausencias', value: 20 },
    { name: 'Vacaciones', value: 10 },
  ];

  return (
    <div className="dashboard-container">
      <h2>Panel de Control</h2>

      {/* Tarjetas resumen */}
      <div className="cards-container">
        <div className="card-summary">✔️ Asistencias hoy: {resumen.asistenciasHoy}</div>
        <div className="card-summary">❌ Ausencias hoy: {resumen.ausenciasHoy}</div>
        <div className="card-summary">🏖️ Vacaciones activas: {resumen.vacacionesActivas}</div>
        <div className="card-summary">⏱️ Promedio semanal: {resumen.horasPromedioSemana}h</div>
      </div>

      {/* Gráfico circular */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={resumenAsistenciaMes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {resumenAsistenciaMes.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de eventos */}
      <h3>Próximos eventos</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Tipo</th>
              <th>Desde</th>
              <th>Hasta</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((ev, i) => (
              <tr key={i}>
                <td>{ev.empleado}</td>
                <td>{ev.tipo}</td>
                <td>{ev.desde}</td>
                <td>{ev.hasta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notificaciones */}
      <div className="notification-box">
        <h3>🔔 Notificaciones</h3>
        <ul>
          {notificaciones.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
