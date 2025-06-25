from app import db

class Workshop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    description = db.Column(db.Text)
    services = db.Column(db.PickleType)
    rating_avg = db.Column(db.Float)

    reviews = db.relationship('Review', backref='workshop', lazy=True)
