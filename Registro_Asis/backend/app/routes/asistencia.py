from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.asistencia import Asistencia
from app.utils.decorators import role_required
from app.models.empleado import Empleado
from datetime import datetime

asistencia_bp = Blueprint('asistencia_bp', __name__)

# Ruta protegida solo para admin (ver todas las asistencias)
@asistencia_bp.route('/api/asistencias', methods=['GET'])
@jwt_required()
@role_required("admin")
def obtener_asistencias():
    asistencias = Asistencia.query.all()
    return jsonify([a.to_dict() for a in asistencias])


# Ruta para registrar nueva asistencia (abierta a empleados y admins)
@asistencia_bp.route('/api/asistencias', methods=['POST'])
@jwt_required()
def registrar_asistencia():
    data = request.get_json()
    nueva = Asistencia(
        empleado_id=data.get("empleado_id"),
        fecha=datetime.strptime(data.get("fecha"), "%Y-%m-%d").date(),
        hora_entrada=datetime.strptime(data.get("hora_entrada"), "%H:%M").time(),
        hora_salida=datetime.strptime(data.get("hora_salida"), "%H:%M").time() if data.get("hora_salida") else None
    )
    db.session.add(nueva)
    db.session.commit()
    return jsonify({"msg": "Asistencia registrada"}), 201


# Ruta para actualizar asistencia (solo con token)
@asistencia_bp.route('/api/asistencias/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_asistencia(id):
    asistencia = Asistencia.query.get_or_404(id)
    data = request.get_json()
    if "hora_entrada" in data:
        asistencia.hora_entrada = datetime.strptime(data["hora_entrada"], "%H:%M").time()
    if "hora_salida" in data:
        asistencia.hora_salida = datetime.strptime(data["hora_salida"], "%H:%M").time()
    db.session.commit()
    return jsonify({"msg": "Asistencia actualizada"})


# Ruta protegida solo para admin (eliminar)
@asistencia_bp.route('/api/asistencias/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required("admin")
def eliminar_asistencia(id):
    asistencia = Asistencia.query.get_or_404(id)
    db.session.delete(asistencia)
    db.session.commit()
    return jsonify({"msg": "Asistencia eliminada"})


# Ruta para empleados: ver solo sus asistencias
@asistencia_bp.route('/api/mis-asistencias', methods=['GET'])
@jwt_required()
def mis_asistencias():
    user_id = get_jwt_identity()
    empleado = Empleado.query.filter_by(usuario_id=user_id).first()
    if not empleado:
        return jsonify({"msg": "Empleado no encontrado"}), 404

    asistencias = Asistencia.query.filter_by(empleado_id=empleado.id).all()
    return jsonify([a.to_dict() for a in asistencias])

# Ruta para empleados: registrar su propia asistencia
@asistencia_bp.route('/api/mis-asistencias', methods=['POST'])
@jwt_required()
@role_required("empleado")
def registrar_mi_asistencia():
    user_id = get_jwt_identity()
    empleado = Empleado.query.filter_by(usuario_id=user_id).first()

    if not empleado:
        return jsonify({"msg": "Empleado no encontrado"}), 404

    data = request.get_json()
    nueva = Asistencia(
        empleado_id=empleado.id,
        fecha=datetime.strptime(data.get("fecha"), "%Y-%m-%d").date(),
        hora_entrada=datetime.strptime(data.get("hora_entrada"), "%H:%M").time(),
        hora_salida=datetime.strptime(data.get("hora_salida"), "%H:%M").time() if data.get("hora_salida") else None,
    )

    db.session.add(nueva)
    db.session.commit()
    return jsonify(nueva.to_dict()), 201
