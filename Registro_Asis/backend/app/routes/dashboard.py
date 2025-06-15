from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.decorators import role_required
from app.models.asistencia import Asistencia
from app.models.vacaciones import Vacaciones
from app.models.empleado import Empleado
from datetime import date, timedelta
from sqlalchemy import func
from app import db

dashboard_bp = Blueprint("dashboard_bp", __name__)

@dashboard_bp.route("/api/dashboard/resumen", methods=["GET"])
@jwt_required()
def obtener_resumen():
    hoy = date.today()
    
    total_asistencias = Asistencia.query.filter_by(fecha=hoy).count()

    empleados_en_vacaciones = Vacaciones.query.filter(
        Vacaciones.fecha_inicio <= hoy,
        Vacaciones.fecha_fin >= hoy,
        Vacaciones.estado == "aprobado"
    ).count()

    total_empleados = Empleado.query.count()
    total_ausencias = total_empleados - total_asistencias - empleados_en_vacaciones

    promedio_horas = db.session.query(
        func.avg(
            func.extract('epoch', Asistencia.hora_salida - Asistencia.hora_entrada) / 3600
        )
    ).scalar() or 0

    return jsonify({
        "asistenciasHoy": total_asistencias,
        "ausenciasHoy": total_ausencias,
        "vacacionesActivas": empleados_en_vacaciones,
        "horasPromedioSemana": round(promedio_horas, 1)
    })


@dashboard_bp.route("/api/dashboard/eventos", methods=["GET"])
@jwt_required()
def obtener_eventos():
    hoy = date.today()
    proximos = Vacaciones.query.filter(
        Vacaciones.fecha_inicio >= hoy,
        Vacaciones.estado == "aprobado"
    ).order_by(Vacaciones.fecha_inicio).limit(5).all()

    data = []
    for v in proximos:
        empleado = Empleado.query.get(v.empleado_id)
        data.append({
            "empleado": empleado.nombre,
            "tipo": "Vacaciones",
            "desde": v.fecha_inicio.isoformat(),
            "hasta": v.fecha_fin.isoformat()
        })
    return jsonify(data)


@dashboard_bp.route("/api/dashboard/notificaciones", methods=["GET"])
@jwt_required()
@role_required("admin")
def obtener_notificaciones():
    hoy = date.today()
    empleados = Empleado.query.all()
    notificaciones = []

    for e in empleados:
        asistencia = Asistencia.query.filter_by(empleado_id=e.id, fecha=hoy).first()
        if not asistencia:
            notificaciones.append(f"Empleado {e.nombre} no registró asistencia hoy.")

        vacaciones_pedidas = Vacaciones.query.filter_by(
            empleado_id=e.id, estado="pendiente"
        ).first()
        if vacaciones_pedidas:
            notificaciones.append(f"Empleado {e.nombre} ha solicitado vacaciones para la próxima semana.")

    return jsonify(notificaciones)
