from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Inicialización de extensiones
db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    load_dotenv()  # Cargar variables de entorno desde .env

    app = Flask(__name__)
    
    # Configuración
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret')

    # Inicialización de extensiones con la app
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Importación de modelos (para registrar con SQLAlchemy)
    from app.models.usuario import Usuario
    from app.models.empleado import Empleado
    from app.models.asistencia import Asistencia
    from app.models.vacaciones import Vacaciones



    # Registro de Blueprints
    from app.routes.auth import auth_bp
    from app.routes.protegido import protegido_bp
    from app.routes.empleado import empleado_bp
    from app.routes.asistencia import asistencia_bp
    from app.routes.vacaciones import vacaciones_bp
    from app.routes.reportes import reportes_bp
    from app.routes.dashboard import dashboard_bp


    app.register_blueprint(auth_bp)
    app.register_blueprint(protegido_bp)
    app.register_blueprint(empleado_bp)
    app.register_blueprint(asistencia_bp)
    app.register_blueprint(vacaciones_bp)
    app.register_blueprint(reportes_bp)
    app.register_blueprint(dashboard_bp)


    return app
