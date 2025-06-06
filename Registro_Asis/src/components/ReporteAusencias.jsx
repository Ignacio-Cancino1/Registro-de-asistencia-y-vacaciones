import React from 'react';

export default function ReporteAusencias() {
  const datos = [
    { empleado: 'Juan', ausencias: 2 },
    { empleado: 'Ana', ausencias: 4 },
    { empleado: 'Carlos', ausencias: 1 },
  ];

  return (
    <div>
      <h3>Reporte de Ausencias</h3>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Días de Ausencia</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr key={i}>
              <td>{d.empleado}</td>
              <td>{d.ausencias}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
