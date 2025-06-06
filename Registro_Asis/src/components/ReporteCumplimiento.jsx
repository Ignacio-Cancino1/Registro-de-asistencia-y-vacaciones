import React from 'react';

export default function ReporteCumplimiento() {
  const datos = [
    { empleado: 'Juan', puntualidad: '95%', retrasos: 2 },
    { empleado: 'Ana', puntualidad: '80%', retrasos: 5 },
    { empleado: 'Carlos', puntualidad: '100%', retrasos: 0 },
  ];

  return (
    <div>
      <h3>Reporte de Cumplimiento de Horario</h3>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Puntualidad</th>
            <th>Retrasos</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.empleado}</td>
              <td>{d.puntualidad}</td>
              <td>{d.retrasos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
