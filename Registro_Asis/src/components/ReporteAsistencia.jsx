import React from 'react';

export default function ReporteAsistencia() {
  const datos = [
    { empleado: 'Juan', mes: 'Junio', asistencias: 20 },
    { empleado: 'Ana', mes: 'Junio', asistencias: 18 },
    { empleado: 'Carlos', mes: 'Junio', asistencias: 22 },
  ];

  return (
    <div>
      <h3>Reporte Mensual de Asistencia</h3>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Mes</th>
            <th>Días asistidos</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.empleado}</td>
              <td>{d.mes}</td>
              <td>{d.asistencias}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
