from app import db

class MaintenanceRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(100))
    maintenance_type = db.Column(db.String(100)) 
    notes = db.Column(db.Text)
    cost = db.Column(db.Float)
    mileage = db.Column(db.Integer)
    bike_id = db.Column(db.Integer, db.ForeignKey('motorbike.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
