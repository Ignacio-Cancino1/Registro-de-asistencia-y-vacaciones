# 📅 Aplicación de Registro de Asistencia y Vacaciones

Sistema web desarrollado para automatizar y gestionar el control de asistencia, permisos y vacaciones de los empleados dentro de una organización. La aplicación permite registrar entradas y salidas, solicitar y aprobar ausencias, y generar reportes exportables en Excel o PDF. El sistema está pensado tanto para empleados como para administradores, con roles diferenciados.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React.js (Vite)
- **Backend**: Flask (Python)
- **Base de datos**: PostgreSQL
- **ORM**: SQLAlchemy
- **Autenticación**: JWT (JSON Web Tokens)
- **Exportación**: Pandas, Openpyxl, jsPDF
- **Despliegue**: Vercel (frontend), Render (backend)

---

## ⚙️ Instalación y configuración en modo local

### Requisitos

- Node.js v16 o superior  
- Python 3.10 o superior  
- PostgreSQL 14 o superior  
- Docker (opcional)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ignacio-Cancino1/Planificador-de-Horarios-Empresariales.git
cd Planificador-de-Horarios-Empresariales
```

### 2. Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

> Asegúrate de tener PostgreSQL corriendo y las variables de entorno correctamente configuradas en `.env`.

---

## ✅ Funcionalidades principales

### 👤 Rol: Empleado

- Iniciar sesión con usuario y contraseña.
- Registrar asistencia (entrada y salida).
- Solicitar vacaciones o permisos.
- Ver historial de asistencias y vacaciones.

> ❗ *Nota: Aunque se planificó un cambio obligatorio de contraseña en el primer inicio de sesión, esta funcionalidad no fue implementada completamente.*

### 🛠️ Rol: Administrador

- Gestionar empleados (crear, editar, eliminar).
- Ver registros de asistencia diarios y mensuales.
- Aprobar o rechazar solicitudes de vacaciones.
- Generar reportes por empleado, mes o fechas.
- Exportar reportes a Excel y PDF.
- Ver estadísticas en el dashboard (tarjetas y gráficos).

---

## 🔧 Características agregadas durante el desarrollo

- Dashboard con tarjetas de resumen (asistencias, ausencias, vacaciones, horas trabajadas).
- Calendario de próximos eventos relevantes.
- Gráficos estadísticos usando Recharts.
- Sistema de filtros en reportes: por mes, empleado y rango de fechas.
- Exportación de reportes a Excel y PDF.
- Protección de rutas y acciones según el rol.
- Estilos personalizados aplicados con CSS.

> ❗ *La redirección automática a cambio de contraseña quedó pendiente por falta de tiempo.*

---

## 🧪 Datos de prueba y acceso

Puedes utilizar estos usuarios de prueba:

### Admin

- **Usuario**: `admin@empresa.com`  
- **Contraseña**: `123456`

### Empleados

- **Usuario**: `empleado1@empresa.com`  
- **Contraseña**: `123456`

- **Usuario**: `empleado2@empresa.com`  
- **Contraseña**: `123456`

> Los usuarios tienen datos de asistencia y vacaciones precargados para pruebas de reportes y dashboard.

---

## 🧩 Estructura de base de datos

Tablas principales:

- `usuarios`  
- `roles`  
- `asistencia`  
- `vacaciones`  
- `reportes`  
- `notificaciones`

Relaciones clave:
- Un `usuario` tiene muchos registros de `asistencia`, `vacaciones` y `reportes`.
- `roles` define los permisos del usuario (empleado o administrador).

---

## 🗓️ Plan de trabajo inicial

### Semana 1 – PMN (Prototipo Mínimo Navegable)

- Diseño básico de pantallas y navegación.
- Estructura de rutas con React Router.
- Primeros componentes con datos simulados.

### Semana 2 – PMV (Producto Mínimo Viable)

- Login con control de roles.
- Registro de asistencia funcional.
- Solicitud de vacaciones guardada en base de datos.
- Reportes iniciales y visualización de registros.

---

## 🧠 Consideraciones técnicas

- Autenticación segura con JWT.
- Protección por roles tanto en frontend como backend.
- Exclusión de días no hábiles (manual).
- Persistencia de sesión en el navegador.
- Exportación a Excel y PDF usando librerías del backend y frontend.

---

## 📌 Pendientes y decisiones abiertas

- Implementar sistema de feriados (API o manual).
- Notificaciones por correo (solo internas por ahora).
- Rediseño visual con Tailwind o Bootstrap.
- Posible migración a VPS con Docker.

---

## 🌐 Despliegue en producción

### 🔹 Frontend (Vercel)

📍 **URL del sitio**:  
[https://vercel.com/ignacio-cancinos-projects/registro-de-asistencia-y-vacaciones](https://registro-de-asistencia-y-vacaciones.vercel.app/login)

**Pasos para desplegar en Vercel:**

1. Crear cuenta en [vercel.com](https://vercel.com).  
2. Importar el repositorio desde GitHub.  
3. Establecer `/frontend` como carpeta raíz.  
4. Configurar la variable de entorno:

```env
VITE_API_URL=https://planificador-api.onrender.com/api
```

---

### 🔸 Backend (Render)

📍 **URL del backend**:  
[https://dashboard.render.com/web/srv-d17mn6buibrs73fsfht0](https://registro-de-asistencia-y-vacaciones.onrender.com)

**Pasos para desplegar en Render:**

1. Crear un nuevo servicio web y subir la carpeta `/backend`.  
2. Establecer las siguientes variables de entorno:

```env
DATABASE_URL=postgresql://usuario:clave@host:puerto/db
SECRET_KEY=clave_super_secreta
JWT_SECRET=otra_clave_para_tokens
```

3. Comando de inicio:

```bash
gunicorn app:app
```

> Render detecta automáticamente el puerto (`$PORT`), no es necesario configurarlo manualmente.

---

## 🔐 Variables de entorno requeridas

### Frontend (Vercel)

```env
VITE_API_URL=https://planificador-api.onrender.com/api
```

### Backend (Render)

```env
DATABASE_URL=postgresql://usuario:clave@host:puerto/db
SECRET_KEY=clave_para_sesiones
JWT_SECRET=clave_para_tokens_jwt
```

---

## 🪪 Licencia

MIT © 2025 Ignacio Cancino  
Este proyecto puede ser usado, modificado y distribuido libremente bajo los términos de la licencia MIT.
