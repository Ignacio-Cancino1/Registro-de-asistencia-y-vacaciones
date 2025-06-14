from app import db

class Empleado(db.Model):
    __tablename__ = 'empleados'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    cargo = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(20), default='Activo')  # Activo o Inactivo
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), unique=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "cargo": self.cargo,
            "estado": self.estado,
            "usuario_id": self.usuario_id
        }

