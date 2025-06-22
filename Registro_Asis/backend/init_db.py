# backend/init_db.py

from app import create_app, db
from app.models.usuario import Usuario

app = create_app()

with app.app_context():
    db.create_all()

    if not Usuario.query.filter_by(correo='admin@empresa.com').first():
        admin = Usuario(correo='admin@empresa.com', clave='123456', rol='admin')
        db.session.add(admin)
        db.session.commit()
        print("✅ Usuario admin creado")
    else:
        print("✅ Usuario admin ya existe")
