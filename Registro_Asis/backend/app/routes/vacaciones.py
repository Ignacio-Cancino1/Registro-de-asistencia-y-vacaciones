# app/routes/vacaciones.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.vacaciones import Vacaciones
from app import db
from app.utils.decorators import role_required
from datetime import datetime

vacaciones_bp = Blueprint('vacaciones_bp', __name__)

@vacaciones_bp.route('/api/vacaciones', methods=['GET'])
@jwt_required()
@role_required('admin')
def obtener_vacaciones():
    vacaciones = Vacaciones.query.all()
    return jsonify([v.to_dict() for v in vacaciones])

@vacaciones_bp.route('/api/vacaciones', methods=['POST'])
@jwt_required()
@role_required('admin')
def registrar_vacacion():
    data = request.get_json()
    try:
        fecha_inicio = datetime.strptime(data.get("fecha_inicio"), "%Y-%m-%d").date()
        fecha_fin = datetime.strptime(data.get("fecha_fin"), "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return jsonify({"msg": "Formato de fecha inválido. Usa YYYY-MM-DD"}), 400

    nueva = Vacaciones(
        empleado_id=data.get("empleado_id"),
        fecha_inicio=fecha_inicio,
        fecha_fin=fecha_fin,
        estado=data.get("estado", "pendiente")
    )
    db.session.add(nueva)
    db.session.commit()
    return jsonify({"msg": "Vacación registrada"}), 201

@vacaciones_bp.route('/api/vacaciones/<int:id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
def actualizar_vacacion(id):
    vacacion = Vacaciones.query.get_or_404(id)
    data = request.get_json()
    if "fecha_inicio" in data:
        try:
            vacacion.fecha_inicio = datetime.strptime(data["fecha_inicio"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"msg": "Fecha de inicio inválida"}), 400
    if "fecha_fin" in data:
        try:
            vacacion.fecha_fin = datetime.strptime(data["fecha_fin"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"msg": "Fecha de fin inválida"}), 400
    vacacion.estado = data.get("estado", vacacion.estado)
    db.session.commit()
    return jsonify({"msg": "Vacación actualizada"})

@vacaciones_bp.route('/api/vacaciones/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def eliminar_vacacion(id):
    vacacion = Vacaciones.query.get_or_404(id)
    db.session.delete(vacacion)
    db.session.commit()
    return jsonify({"msg": "Vacación eliminada"})
