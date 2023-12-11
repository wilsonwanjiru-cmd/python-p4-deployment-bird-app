from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Bird(db.Model, SerializerMixin):
    __tablename__ = 'birds'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    species = db.Column(db.String(255), nullable=False)
    image = db.Column(db.Text)

    def __repr__(self):
        return f'<Bird {self.name} | Species: {self.species}>'
