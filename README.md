
# 📅 Aplicación de Registro de Asistencia y Vacaciones

Sistema web desarrollado para automatizar y gestionar el control de asistencia, permisos y vacaciones de los empleados dentro de una organización. La aplicación permite registrar la entrada y salida diaria, solicitar y aprobar ausencias, y generar reportes exportables.

------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Tecnologías utilizadas

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Base de datos**: PostgreSQL
- **ORM**: SQLAlchemy
- **Autenticación**: JWT (JSON Web Tokens)
- **Exportación**: Pandas + Openpyxl
- **Despliegue**: Docker (en desarrollo)

------------------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Instalación y configuración (modo local)

### Requisitos

- Node.js v16 o superior
- Python 3.10 o superior
- PostgreSQL 14 o superior
- Docker (opcional)

### 1. Clonar el repositorio

```bash o terminal 
git clone https://github.com/TU_USUARIO/registro-asistencia-vacaciones.git
cd registro-asistencia-vacaciones
```

### 2. Backend (Flask)

```bash o terminal 
cd backend
python -m venv venv
source venv/bin/activate   # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend (React)

```bash o terminal 
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------------------------------------------------------------------------

## ✅ Funcionalidades principales

### 👤 Empleado

- Iniciar sesión y cambiar contraseña obligatoria si corresponde
- Registrar entrada y salida diaria
- Solicitar vacaciones o permisos
- Ver historial de asistencia y estado de solicitudes

### 🛠️ Administrador

- Gestionar usuarios (alta, edición, baja)
- Revisar asistencia diaria o mensual
- Aprobar o rechazar solicitudes de ausencia
- Generar reportes mensuales/anuales
- Exportar reportes en Excel o PDF
- Visualizar estadísticas

------------------------------------------------------------------------------------------------------------------------------------------

## 🧩 Estructura de base de datos

Tablas principales:

- `usuarios`
- `roles`
- `asistencia`
- `vacaciones`
- `permisos`
- `reportes`
- `notificaciones`

Con relaciones 1:N desde `usuarios` a todas las tablas de actividad.

------------------------------------------------------------------------------------------------------------------------------------------

## 🗓️ Plan de trabajo inicial

### Semana 1 – PMN (Prototipo Mínimo Navegable)
- Diseño de pantallas y navegación
- Interfaces básicas con React Router
- Mockups funcionales

### Semana 2 – PMV (Producto Mínimo Viable)
- Login y control de sesiones
- Registro de asistencia funcional
- Envío de solicitudes y guardado en BD
- Generación de reportes básicos

------------------------------------------------------------------------------------------------------------------------------------------

## 🧠 Consideraciones técnicas

- Autenticación segura mediante JWT
- Validación de días hábiles y exclusión de feriados
- Notificaciones automáticas por evento
- Exportación de datos a Excel
- Protección de rutas y permisos por rol

------------------------------------------------------------------------------------------------------------------------------------------

## 📌 Pendientes / decisiones abiertas

- Gestión de feriados: manual vs API externa
- Notificaciones: sistema interno o envío por correo
- Despliegue: Render / Railway / Docker en VPS
- Frontend visual: uso de Tailwind o Bootstrap

------------------------------------------------------------------------------------------------------------------------------------------

## 🪪 Licencia
MIT © 2025 Ignacio Cancino
