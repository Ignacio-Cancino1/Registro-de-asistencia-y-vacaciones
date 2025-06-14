from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

protegido_bp = Blueprint('protegido_bp', __name__)

@protegido_bp.route('/api/protegido', methods=['GET'])
@jwt_required()
def ruta_protegida():
    from app.models.usuario import Usuario  # 👈 mover aquí evita el ciclo
    user_id = int(get_jwt_identity())
    usuario = Usuario.query.get(user_id)

    if not usuario:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(msg=f"Hola, {usuario.correo}. Accediste a una ruta protegida.")
