from app import db

class Asistencia(db.Model):
    __tablename__ = 'asistencias'
    id = db.Column(db.Integer, primary_key=True)
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleados.id'), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    hora_entrada = db.Column(db.Time, nullable=True)
    hora_salida = db.Column(db.Time, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "empleado_id": self.empleado_id,
            "fecha": self.fecha.isoformat(),
            "hora_entrada": self.hora_entrada.isoformat() if self.hora_entrada else None,
            "hora_salida": self.hora_salida.isoformat() if self.hora_salida else None
        }
