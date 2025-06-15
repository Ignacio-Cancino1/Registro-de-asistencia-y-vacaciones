# app/routes/reportes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models.asistencia import Asistencia
from app.models.empleado import Empleado
from app.utils.decorators import role_required
from app import db
from datetime import datetime, timedelta
from app.models.vacaciones import Vacaciones
from flask import send_file
from app.utils.export_excel import (
    generar_excel_asistencias,
    generar_excel_vacaciones,
    generar_excel_ausencias,
    generar_excel_cumplimiento
)


reportes_bp = Blueprint('reportes_bp', __name__)

@reportes_bp.route('/api/reportes/asistencias', methods=['GET'])
@jwt_required()
@role_required('admin')
def reporte_asistencias():
    empleado_id = request.args.get('empleado_id')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    query = Asistencia.query

    if empleado_id:
        query = query.filter_by(empleado_id=empleado_id)
    
    if fecha_inicio and fecha_fin:
        try:
            inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d").date()
            fin = datetime.strptime(fecha_fin, "%Y-%m-%d").date()
            query = query.filter(Asistencia.fecha.between(inicio, fin))
        except ValueError:
            return jsonify({"msg": "Fechas inválidas. Usa el formato YYYY-MM-DD"}), 400

    asistencias = query.all()
    return jsonify([a.to_dict() for a in asistencias])


@reportes_bp.route('/api/reportes/vacaciones', methods=['GET'])
@jwt_required()
@role_required('admin')
def reporte_vacaciones():
    empleado_id = request.args.get('empleado_id')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    query = Vacaciones.query

    if empleado_id:
        query = query.filter_by(empleado_id=empleado_id)

    if fecha_inicio and fecha_fin:
        try:
            inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d").date()
            fin = datetime.strptime(fecha_fin, "%Y-%m-%d").date()
            query = query.filter(Vacaciones.fecha_inicio >= inicio, Vacaciones.fecha_fin <= fin)
        except ValueError:
            return jsonify({"msg": "Fechas inválidas. Usa el formato YYYY-MM-DD"}), 400

    vacaciones = query.all()
    return jsonify([v.to_dict() for v in vacaciones])


@reportes_bp.route('/api/reportes/ausencias', methods=['GET'])
@jwt_required()
@role_required('admin')
def reporte_ausencias():
    empleado_id = request.args.get('empleado_id', type=int)
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    if not (empleado_id and fecha_inicio and fecha_fin):
        return jsonify({"msg": "Faltan parámetros requeridos"}), 400

    try:
        inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d").date()
        fin = datetime.strptime(fecha_fin, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"msg": "Formato de fecha inválido"}), 400

    # 1. Crear set con fechas hábiles en el rango
    fechas_habiles = [
        inicio + timedelta(days=i) for i in range((fin - inicio).days + 1)
        if (inicio + timedelta(days=i)).weekday() < 5  # Lunes a Viernes
    ]

    # 2. Obtener fechas con asistencia registrada
    asistencias = Asistencia.query.filter_by(empleado_id=empleado_id)\
        .filter(Asistencia.fecha.between(inicio, fin)).all()
    fechas_asistidas = {a.fecha for a in asistencias}

    # 3. Obtener fechas de vacaciones aprobadas
    vacaciones = Vacaciones.query.filter_by(empleado_id=empleado_id, estado='aprobado')\
        .filter(Vacaciones.fecha_inicio <= fin, Vacaciones.fecha_fin >= inicio).all()
    fechas_vacaciones = set()
    for v in vacaciones:
        rango = [
            v.fecha_inicio + timedelta(days=i) 
            for i in range((v.fecha_fin - v.fecha_inicio).days + 1)
        ]
        fechas_vacaciones.update(rango)

    # 4. Filtrar ausencias: días hábiles que no están ni en asistencias ni en vacaciones
    ausencias = [f.isoformat() for f in fechas_habiles if f not in fechas_asistidas and f not in fechas_vacaciones]

    return jsonify({
        "empleado_id": empleado_id,
        "ausencias": ausencias,
        "total": len(ausencias)
    })


@reportes_bp.route('/api/reportes/cumplimiento', methods=['GET'])
@jwt_required()
@role_required('admin')
def reporte_cumplimiento():
    empleado_id = request.args.get('empleado_id')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    if not (empleado_id and fecha_inicio and fecha_fin):
        return jsonify({"msg": "Faltan parámetros requeridos"}), 400

    try:
        inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d").date()
        fin = datetime.strptime(fecha_fin, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"msg": "Fechas inválidas. Usa el formato YYYY-MM-DD"}), 400

    asistencias = Asistencia.query.filter(
        Asistencia.empleado_id == empleado_id,
        Asistencia.fecha.between(inicio, fin)
    ).all()

    resultados = []
    for asistencia in asistencias:
        if asistencia.hora_entrada and asistencia.hora_salida:
            horas = (
                datetime.combine(asistencia.fecha, asistencia.hora_salida) -
                datetime.combine(asistencia.fecha, asistencia.hora_entrada)
            ).seconds / 3600
            cumplimiento = "Sí" if horas >= 8 else "No"
        else:
            horas = 0
            cumplimiento = "No"

        resultados.append({
            "fecha": asistencia.fecha.isoformat(),
            "hora_entrada": asistencia.hora_entrada.isoformat() if asistencia.hora_entrada else None,
            "hora_salida": asistencia.hora_salida.isoformat() if asistencia.hora_salida else None,
            "horas_trabajadas": round(horas, 2),
            "cumple_jornada": cumplimiento
        })

    return jsonify(resultados)



@reportes_bp.route('/api/reportes/asistencias/exportar', methods=['GET'])
@jwt_required()
@role_required("admin")
def exportar_asistencias():
    asistencias = Asistencia.query.all()
    output = generar_excel_asistencias(asistencias)
    return send_file(
        output,
        download_name="reporte_asistencias.xlsx",
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@reportes_bp.route('/api/reportes/vacaciones/exportar', methods=['GET'])
@jwt_required()
@role_required("admin")
def exportar_vacaciones():
    vacaciones = Vacaciones.query.all()
    output = generar_excel_vacaciones(vacaciones)
    return send_file(
        output,
        download_name="reporte_vacaciones.xlsx",
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@reportes_bp.route('/api/reportes/ausencias/exportar', methods=['GET'])
@jwt_required()
@role_required("admin")
def exportar_ausencias():
    empleado_id = request.args.get('empleado_id', type=int)
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    if not (empleado_id and fecha_inicio and fecha_fin):
        return jsonify({"msg": "Faltan parámetros requeridos"}), 400

    try:
        inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d").date()
        fin = datetime.strptime(fecha_fin, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"msg": "Formato de fecha inválido"}), 400

    fechas_habiles = [
        inicio + timedelta(days=i) for i in range((fin - inicio).days + 1)
        if (inicio + timedelta(days=i)).weekday() < 5
    ]
    asistencias = Asistencia.query.filter_by(empleado_id=empleado_id)\
        .filter(Asistencia.fecha.between(inicio, fin)).all()
    fechas_asistidas = {a.fecha for a in asistencias}
    vacaciones = Vacaciones.query.filter_by(empleado_id=empleado_id, estado='aprobado')\
        .filter(Vacaciones.fecha_inicio <= fin, Vacaciones.fecha_fin >= inicio).all()
    fechas_vacaciones = set()
    for v in vacaciones:
        rango = [
            v.fecha_inicio + timedelta(days=i) 
            for i in range((v.fecha_fin - v.fecha_inicio).days + 1)
        ]
        fechas_vacaciones.update(rango)
    ausencias = [f for f in fechas_habiles if f not in fechas_asistidas and f not in fechas_vacaciones]

    output = generar_excel_ausencias([{"fecha": a.isoformat()} for a in ausencias])
    return send_file(
        output,
        download_name="reporte_ausencias.xlsx",
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@reportes_bp.route('/api/reportes/cumplimiento/exportar', methods=['GET'])
@jwt_required()
@role_required("admin")
def exportar_cumplimiento():
    empleado_id = request.args.get('empleado_id')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')

    if not (empleado_id and fecha_inicio and fecha_fin):
        return jsonify({"msg": "Faltan parámetros requeridos"}), 400

    try:
        inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d").date()
        fin = datetime.strptime(fecha_fin, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"msg": "Fechas inválidas"}), 400

    asistencias = Asistencia.query.filter(
        Asistencia.empleado_id == empleado_id,
        Asistencia.fecha.between(inicio, fin)
    ).all()

    resultados = []
    for asistencia in asistencias:
        if asistencia.hora_entrada and asistencia.hora_salida:
            horas = (
                datetime.combine(asistencia.fecha, asistencia.hora_salida) -
                datetime.combine(asistencia.fecha, asistencia.hora_entrada)
            ).seconds / 3600
            cumple = "Sí" if horas >= 8 else "No"
        else:
            horas = 0
            cumple = "No"

        resultados.append({
            "fecha": asistencia.fecha.isoformat(),
            "hora_entrada": asistencia.hora_entrada.isoformat() if asistencia.hora_entrada else None,
            "hora_salida": asistencia.hora_salida.isoformat() if asistencia.hora_salida else None,
            "horas_trabajadas": round(horas, 2),
            "cumple_jornada": cumple
        })

    output = generar_excel_cumplimiento(resultados)
    return send_file(
        output,
        download_name="reporte_cumplimiento.xlsx",
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
