import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import API from '../services/api';

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
      .catch(() => setNotificaciones([])); // Para rol empleado
  }, []);

  if (!resumen) return <p>Cargando...</p>;

  const resumenAsistenciaMes = [
    { name: 'Asistencias', value: 120 },
    { name: 'Ausencias', value: 20 },
    { name: 'Vacaciones', value: 10 },
  ];

  return (
    <div>
      <h2>Panel de Control</h2>

      {/* Tarjetas resumen */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>✔️ Asistencias hoy: {resumen.asistenciasHoy}</div>
        <div style={cardStyle}>❌ Ausencias hoy: {resumen.ausenciasHoy}</div>
        <div style={cardStyle}>🏖️ Vacaciones activas: {resumen.vacacionesActivas}</div>
        <div style={cardStyle}>⏱️ Promedio semanal: {resumen.horasPromedioSemana}h</div>
      </div>

      {/* Gráfico (aún con datos mock) */}
      <div style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
        <ResponsiveContainer>
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

      {/* Eventos */}
      <h3>Próximos eventos</h3>
      <table style={tableStyle}>
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

      {/* Notificaciones */}
      <h3 style={{ marginTop: '2rem' }}>🔔 Notificaciones</h3>
      <ul>
        {notificaciones.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  padding: '1rem',
  background: '#f7f7f7',
  borderRadius: '10px',
  textAlign: 'center',
  fontWeight: 'bold',
  boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '1rem',
};
