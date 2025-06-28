from app import db

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    subscribed_to = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
