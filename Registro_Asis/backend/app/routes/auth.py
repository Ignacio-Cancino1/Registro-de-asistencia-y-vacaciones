from flask import Blueprint, request, jsonify
from app.models.usuario import Usuario
from app import db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    clave = data.get('clave')

    usuario = Usuario.query.filter_by(correo=correo, clave=clave).first()
    if not usuario:
        return jsonify({"msg": "Correo o clave incorrectos"}), 401
        
    claims = {"rol": usuario.rol}
    token = create_access_token(identity=str(usuario.id), additional_claims=claims)
    return jsonify(token=token, rol=usuario.rol)

@auth_bp.route('/api/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()
    correo = data.get('correo')
    clave = data.get('clave')
    rol = data.get('rol', 'empleado')

    if not correo or not clave:
        return jsonify({"msg": "Correo y clave son obligatorios"}), 400

    if Usuario.query.filter_by(correo=correo).first():
        return jsonify({"msg": "Ya existe un usuario con ese correo"}), 409

    nuevo_usuario = Usuario(correo=correo, clave=clave, rol=rol)
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado exitosamente"}), 201

# ✅ Esta ruta ahora está correctamente alineada
@auth_bp.route("/", methods=["GET"])
def index():
    return {"mensaje": "API de Registro de Asistencia y Vacaciones funcionando ✅"}
