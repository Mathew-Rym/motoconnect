from app import db

class Part(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100))
    price = db.Column(db.Float)
    condition = db.Column(db.String(50))
    description = db.Column(db.Text)
    images = db.Column(db.PickleType)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
