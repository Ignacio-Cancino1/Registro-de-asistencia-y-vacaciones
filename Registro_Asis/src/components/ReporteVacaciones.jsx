import React from 'react';

export default function ReporteVacaciones() {
  const datos = [
    { empleado: 'Juan', diasSolicitados: 5, diasAprobados: 5 },
    { empleado: 'Ana', diasSolicitados: 10, diasAprobados: 8 },
  ];

  return (
    <div>
      <h3>Reporte de Vacaciones</h3>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Días Solicitados</th>
            <th>Días Aprobados</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.empleado}</td>
              <td>{d.diasSolicitados}</td>
              <td>{d.diasAprobados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
