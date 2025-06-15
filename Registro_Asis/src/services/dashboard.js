// src/services/dashboard.js
import API from './api';

export const obtenerResumenDashboard = async () => {
  const res = await API.get('/dashboard/resumen');
  return res.data;
};

export const obtenerProximosEventos = async () => {
  const res = await API.get('/dashboard/eventos');
  return res.data;
};

export const obtenerNotificaciones = async () => {
  const res = await API.get('/dashboard/notificaciones');
  return res.data;
};
