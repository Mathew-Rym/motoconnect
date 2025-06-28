from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "User already exists"}), 409

    user = User(
        username=data['username'],
        email=data['email'],
        location=data.get('location'),
        bio=data.get('bio'),
        avatar_url=data.get('avatar_url')
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({
            "username": user.username,
            "email": user.email,
            "location": user.location,
            "avatar_url": user.avatar_url
        }), 200
    return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    user_id = 1  
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "username": user.username,
            "email": user.email,
            "location": user.location,
            "bio": user.bio,
            "avatar_url": user.avatar_url
        }), 200
    return jsonify({"error": "User not found"}), 404
