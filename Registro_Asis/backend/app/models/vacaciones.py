from app import db

class Vacaciones(db.Model):
    __tablename__ = 'vacaciones'

    id = db.Column(db.Integer, primary_key=True)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    estado = db.Column(db.String(20), default='pendiente')  # aprobado, rechazado, pendiente

    def to_dict(self):
        return {
            "id": self.id,
            "empleado_id": self.empleado_id,
            "fecha_inicio": self.fecha_inicio.isoformat(),
            "fecha_fin": self.fecha_fin.isoformat(),
            "estado": self.estado
        }
