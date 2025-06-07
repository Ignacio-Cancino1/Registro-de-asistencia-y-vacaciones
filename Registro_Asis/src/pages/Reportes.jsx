import React, { useState } from 'react';
import ReporteAsistencia from '../components/ReporteAsistencia';
import ReporteVacaciones from '../components/ReporteVacaciones';
import ReporteAusencias from '../components/ReporteAusencias';
import ReporteCumplimiento from '../components/ReporteCumplimiento';

export default function Reportes() {
  const [reporteActivo, setReporteActivo] = useState('asistencia');

  const renderReporte = () => {
    switch (reporteActivo) {
      case 'asistencia':
        return <ReporteAsistencia />;
      case 'vacaciones':
        return <ReporteVacaciones />;
      case 'ausencias':
        return <ReporteAusencias />;
      case 'cumplimiento':
        return <ReporteCumplimiento />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Reportes</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setReporteActivo('asistencia')} style={{ marginRight: '0.5rem' }}>
          Asistencia
        </button>
        <button onClick={() => setReporteActivo('vacaciones')} style={{ marginRight: '0.5rem' }}>
          Vacaciones
        </button>
        <button onClick={() => setReporteActivo('ausencias')} style={{ marginRight: '0.5rem' }}>
          Ausencias
        </button>
        <button onClick={() => setReporteActivo('cumplimiento')}>
          Cumplimiento de Horario
        </button>
      </div>
      {renderReporte()}
    </div>
  );
}
