// ✅ Reportes.jsx (vista principal con tabs)
import { useState } from 'react';
import ReporteAsistencia from '../components/ReporteAsistencia';
import ReporteVacaciones from '../components/ReporteVacaciones';
import ReporteAusencias from '../components/ReporteAusencias';
import ReporteCumplimiento from '../components/ReporteCumplimiento';

export default function Reportes() {
  const [tab, setTab] = useState('asistencia');

  return (
    <div>
      <h2>Panel de Reportes</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setTab('asistencia')}>Asistencia Mensual</button>
        <button onClick={() => setTab('vacaciones')}>Vacaciones</button>
        <button onClick={() => setTab('ausencias')}>Ausencias</button>
        <button onClick={() => setTab('cumplimiento')}>Cumplimiento de Horario</button>
      </div>
      <div>
        {tab === 'asistencia' && <ReporteAsistencia />}
        {tab === 'vacaciones' && <ReporteVacaciones />}
        {tab === 'ausencias' && <ReporteAusencias />}
        {tab === 'cumplimiento' && <ReporteCumplimiento />}
      </div>
    </div>
  );
}
