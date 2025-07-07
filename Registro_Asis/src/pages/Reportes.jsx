import React, { useState } from 'react';
import ReporteAsistencia from '../components/ReporteAsistencia';
import ReporteVacaciones from '../components/ReporteVacaciones';
import ReporteAusencias from '../components/ReporteAusencias';
import ReporteCumplimiento from '../components/ReporteCumplimiento';
import './Reportes.css'; // Asegúrate de tener este archivo en /pages

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
    <div className="reportes-container">
      <h2>Reportes</h2>

      <div className="filtro-tabs">
        <button
          className={reporteActivo === 'asistencia' ? 'active' : ''}
          onClick={() => setReporteActivo('asistencia')}
        >
          Asistencia
        </button>

        <button
          className={reporteActivo === 'vacaciones' ? 'active' : ''}
          onClick={() => setReporteActivo('vacaciones')}
        >
          Vacaciones
        </button>

        <button
          className={reporteActivo === 'ausencias' ? 'active' : ''}
          onClick={() => setReporteActivo('ausencias')}
        >
          Ausencias
        </button>

        <button
          className={reporteActivo === 'cumplimiento' ? 'active' : ''}
          onClick={() => setReporteActivo('cumplimiento')}
        >
          Cumplimiento de Horario
        </button>
      </div>

      {renderReporte()}
    </div>
  );
}
