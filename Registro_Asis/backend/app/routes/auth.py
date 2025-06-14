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

    token = create_access_token(identity=str(usuario.id))
    return jsonify(token=token, rol=usuario.rol)

