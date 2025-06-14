from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models.empleado import Empleado
from app.utils.decorators import role_required


empleado_bp = Blueprint('empleado_bp', __name__)

@empleado_bp.route('/api/empleados', methods=['GET'])
@jwt_required()
@role_required("admin")
def obtener_empleados():
    empleados = Empleado.query.all()
    return jsonify([e.to_dict() for e in empleados])

@empleado_bp.route('/api/empleados', methods=['POST'])
@jwt_required()
@role_required("admin")
def crear_empleado():
    data = request.get_json()
    nuevo = Empleado(
        nombre=data.get("nombre"),
        cargo=data.get("cargo"),
        estado=data.get("estado", "Activo"),
        usuario_id=data.get("usuario_id")
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({"msg": "Empleado creado"}), 201

@empleado_bp.route('/api/empleados/<int:id>', methods=['PUT'])
@jwt_required()
@role_required("admin")
def actualizar_empleado(id):
    emp = Empleado.query.get_or_404(id)
    data = request.get_json()
    emp.nombre = data.get("nombre", emp.nombre)
    emp.cargo = data.get("cargo", emp.cargo)
    emp.estado = data.get("estado", emp.estado)
    db.session.commit()
    return jsonify({"msg": "Empleado actualizado"})

@empleado_bp.route('/api/empleados/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required("admin")
def eliminar_empleado(id):
    emp = Empleado.query.get_or_404(id)
    db.session.delete(emp)
    db.session.commit()
    return jsonify({"msg": "Empleado eliminado"})
