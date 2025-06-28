from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)
    location = db.Column(db.String(100))
    bio = db.Column(db.Text)
    avatar_url = db.Column(db.String(255))

    motorbikes = db.relationship('Motorbike', backref='owner', lazy=True)
    parts = db.relationship('Part', backref='owner', lazy=True)
    maintenance_records = db.relationship('MaintenanceRecord', backref='owner', lazy=True)
    posts = db.relationship('Post', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)

    subscriptions = db.relationship('Subscription', foreign_keys='Subscription.user_id', backref='subscriber', lazy=True)
    
    reviews = db.relationship('Review', backref='reviewer', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "location": self.location,
            "bio": self.bio,
            "avatar_url": self.avatar_url
        }
