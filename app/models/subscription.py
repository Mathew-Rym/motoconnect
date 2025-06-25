from app import db

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    target_id = db.Column(db.Integer)  # ID of the user or workshop being followed
    target_type = db.Column(db.String(50))  # 'user' or 'workshop'
