# 📅 Aplicación de Registro de Asistencia y Vacaciones

Sistema web desarrollado para automatizar y gestionar el control de asistencia, permisos y vacaciones de los empleados dentro de una organización. La aplicación permite registrar entradas y salidas, solicitar y aprobar ausencias, y generar reportes exportables en Excel o PDF. El sistema está pensado tanto para empleados como administradores, con roles diferenciados.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React.js (con Vite)
- **Backend**: Flask (Python)
- **Base de datos**: PostgreSQL
- **ORM**: SQLAlchemy
- **Autenticación**: JWT (JSON Web Tokens)
- **Exportación**: Pandas + Openpyxl + jsPDF
- **Despliegue**: Vercel (frontend) y Render (backend)

---

## ⚙️ Instalación y configuración en modo local

### Requisitos

- Node.js v16 o superior  
- Python 3.10 o superior  
- PostgreSQL 14+  
- Docker (opcional)

### 1. Clonar el repositorio


git clone https://github.com/Ignacio-Cancino1/Planificador-de-Horarios-Empresariales.git
cd Planificador-de-Horarios-Empresariales
2. Configurar el Backend (Flask)
bash
Copiar
Editar
cd backend
python -m venv venv
source venv/bin/activate     # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
3. Configurar el Frontend (React)
bash
Copiar
Editar
cd frontend
npm install
npm run dev
Asegúrate de tener PostgreSQL corriendo y las variables de entorno correctamente configuradas en .env.

✅ Funcionalidades principales
👤 Rol: Empleado
Iniciar sesión con usuario y contraseña

Registrar asistencia (entrada/salida)

Solicitar vacaciones o permisos

Ver su historial de asistencias y vacaciones

❗ Nota: Aunque se planificó un cambio obligatorio de contraseña en el primer inicio de sesión, esta funcionalidad no fue implementada completamente.

🛠️ Rol: Administrador
Gestionar empleados (crear, editar, eliminar)

Revisar registros de asistencia por fecha o usuario

Aprobar o rechazar solicitudes de vacaciones

Generar reportes (por mes, por empleado, por fechas)

Exportar reportes a Excel y PDF

Ver panel resumen (dashboard con estadísticas)

🔧 Características agregadas durante el desarrollo
Durante el desarrollo se añadieron varias funcionalidades que no estaban en el plan inicial, como:

Dashboard con tarjetas de resumen (asistencias, ausencias, vacaciones, horas trabajadas)

Calendario de próximos eventos (vacaciones, ausencias)

Gráficos con estadísticas (usando Recharts)

Sistema de filtros avanzados en reportes (por mes, empleado y fechas)

Exportación de reportes a Excel y PDF

Protección de rutas por roles (empleado vs. admin)

Estilos visuales personalizados con CSS

❗ Algunas funcionalidades previstas, como la redirección automática al formulario de cambio de contraseña, quedaron pendientes por falta de tiempo.

🧪 Datos de prueba y acceso
Puedes usar estos datos para probar la aplicación directamente desde el despliegue:

Admin (acceso total)
Usuario: admin@empresa.com

Contraseña: 123456

Empleado (solo su información)
Usuario: empleado1@empresa.com

Contraseña: 123456

Todos los usuarios están pre-cargados con asistencias y solicitudes de vacaciones para pruebas de reportes y dashboard.

🧩 Estructura de la base de datos
Tablas principales:

usuarios

roles

asistencia

vacaciones

reportes

notificaciones

Relaciones:
Un usuario tiene muchas asistencias, muchas vacaciones, y puede generar múltiples reportes. El sistema diferencia roles para aplicar permisos adecuados.

🗓️ Plan de trabajo inicial
Semana 1 – PMN (Prototipo Mínimo Navegable)
Diseño de pantallas y navegación básica

Rutas principales con React Router

Componentes funcionales con datos simulados

Semana 2 – PMV (Producto Mínimo Viable)
Login funcional con control de roles y sesiones

Registro real de asistencia (con conexión a backend)

Solicitud y visualización de vacaciones

Generación de reportes básicos

🧠 Consideraciones técnicas
Manejo de sesiones seguro con JWT

Exclusión de días no laborables en solicitudes

Exportación de reportes a formatos PDF y Excel

Control de permisos por rol desde frontend y backend

Persistencia de login en frontend (con localStorage)

📌 Pendientes y decisiones abiertas
Sistema de feriados: ¿manual o con API externa?

Notificaciones: ¿solo internas o también por correo?

Mejora visual con Tailwind o Bootstrap

Posible despliegue completo en VPS con Docker

🌐 Despliegue en producción
🔹 Frontend (React) en Vercel
📍 URL del sitio en línea:
https://vercel.com/ignacio-cancinos-projects/registro-de-asistencia-y-vacaciones

Pasos para desplegar:
Crear cuenta en vercel.com

Importar el repositorio desde GitHub

Elegir /frontend como directorio raíz

Configurar la variable de entorno:

bash
Copiar
Editar
VITE_API_URL=https://planificador-api.onrender.com/api
🔸 Backend (Flask) en Render
📍 URL del backend:
https://registro-de-asistencia-y-vacaciones.onrender.com

Pasos para desplegar:
Crear servicio web en Render e importar el proyecto (/backend)

Configurar las variables de entorno:

bash
Copiar
Editar
DATABASE_URL=postgresql://usuario:clave@host:puerto/db
SECRET_KEY=clave_super_secreta
JWT_SECRET=otra_clave_para_tokens
Comando de inicio:

bash
Copiar
Editar
gunicorn app:app
o

bash
Copiar
Editar
python app.py
Render expone automáticamente el puerto $PORT, no es necesario definirlo manualmente

🔐 Variables de entorno requeridas
Frontend (Vercel)
env
Copiar
Editar
VITE_API_URL=https://planificador-api.onrender.com/api
Backend (Render)
env
Copiar
Editar
DATABASE_URL=postgresql://usuario:clave@host:puerto/db
SECRET_KEY=clave_para_sesiones
JWT_SECRET=clave_para_tokens_jwt
🪪 Licencia
MIT © 2025 Ignacio Cancino
Este proyecto puede ser usado, modificado y distribuido libremente bajo los términos de la licencia MIT.
