
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

## 🌐 Despliegue en Producción

### 🔹 Frontend (React) en Vercel

El frontend está desplegado en [Vercel](https://vercel.com), lo que permite una carga rápida, actualización continua y dominio personalizado.

📍 **URL del sitio**:  
`https://registro-asistencia.vercel.app` *(modifícalo según tu proyecto real)*

#### Instrucciones de despliegue:

1. Crear cuenta en [Vercel](https://vercel.com) y vincular con GitHub.
2. Importar el proyecto y seleccionar `/frontend` como carpeta raíz.
3. Configurar las variables de entorno necesarias:
   - `VITE_API_URL=https://backend-render.onrender.com/api`
4. Hacer deploy. Vercel construirá automáticamente el proyecto React.

------------------------------------------------------------------------------------------------------------------------------------------

### 🔸 Backend (Flask) en Render o Railway

El backend puede desplegarse en servicios como [Render](https://render.com) o [Railway](https://railway.app), permitiendo una API REST pública.

📍 **URL del backend (ejemplo)**:  
`https://registro-api.onrender.com/api`

#### Instrucciones de despliegue:

1. Subir el contenido de la carpeta `/backend` a un nuevo servicio web en Render o Railway.
2. Configurar variables de entorno:
   - `DATABASE_URL`
   - `SECRET_KEY`
   - `JWT_SECRET`
3. Definir el comando de inicio: `gunicorn app:app` o `python app.py`
4. Exponer el puerto correcto (Render usa por defecto `$PORT`).

------------------------------------------------------------------------------------------------------------------------------------------

### 🔐 Variables de entorno necesarias

#### Frontend (Vercel)

```
VITE_API_URL=https://tubackend/api
```

#### Backend (Render)

```
DATABASE_URL=postgresql://usuario:clave@host:puerto/db
SECRET_KEY=clave_secreta_para_sesion
JWT_SECRET=clave_para_tokens
```

------------------------------------------------------------------------------------------------------------------------------------------

## 🪪 Licencia
MIT © 2025 Ignacio Cancino
