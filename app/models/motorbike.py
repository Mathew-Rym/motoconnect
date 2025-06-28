from app import db

class Motorbike(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer)
    price = db.Column(db.Float)
    mileage = db.Column(db.Integer)
    description = db.Column(db.Text)
    location = db.Column(db.String(100))
    images = db.Column(db.PickleType)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    reviews = db.relationship('Review', backref='motorbike', lazy=True)
    maintenance_records = db.relationship('MaintenanceRecord', backref='motorbike', lazy=True)
