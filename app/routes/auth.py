# from flask import Blueprint, request, jsonify
# from app import db
# from app.models.user import User

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists"}), 409

#     user = User(
#         username=data['username'],
#         email=data['email'],
#         location=data.get('location'),
#         bio=data.get('bio'),
#         avatar_url=data.get('avatar_url')
#     )
#     user.set_password(data['password'])
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"message": "User registered"}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data['email']).first()
#     if user and user.check_password(data['password']):
#         return jsonify({
#             "username": user.username,
#             "email": user.email,
#             "location": user.location,
#             "avatar_url": user.avatar_url
#         }), 200
#     return jsonify({"error": "Invalid credentials"}), 401

# @auth_bp.route('/profile', methods=['GET'])
# def get_profile():
#     user_id = 1  
#     user = User.query.get(user_id)
#     if user:
#         return jsonify({
#             "username": user.username,
#             "email": user.email,
#             "location": user.location,
#             "bio": user.bio,
#             "avatar_url": user.avatar_url
#         }), 200
#     return jsonify({"error": "User not found"}), 404








from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
import traceback  # For detailed error logging

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("📩 Incoming registration data:", data)

        # Validate required fields
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"'{field}' is required"}), 400

        # Check for duplicate username or email
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Email already in use"}), 409
        if User.query.filter_by(username=data['username']).first():
            return jsonify({"error": "Username already in use"}), 409

        # Create user instance
        user = User(
            username=data['username'],
            email=data['email'],
            location=data.get('location', ''),
            bio=data.get('bio', ''),
            avatar_url=data.get('avatar_url', '')
        )
        user.set_password(data['password'])

        # Save to DB
        db.session.add(user)
        db.session.commit()

        print("✅ User registered successfully:", user.to_dict())
        return jsonify(user.to_dict()), 201

    except Exception as e:
        print("❌ Registration failed:", str(e))
        traceback.print_exc()  # Logs full error stack
        return jsonify({"error": "Something went wrong during registration"}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get('email') or not data.get('password'):
            return jsonify({"error": "Email and password are required"}), 400

        user = User.query.filter_by(email=data['email']).first()

        if user and user.check_password(data['password']):
            return jsonify(user.to_dict()), 200
        return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        print("❌ Login failed:", str(e))
        traceback.print_exc()
        return jsonify({"error": "Something went wrong during login"}), 500


@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    # ⚠️ NOTE: Dummy user_id for testing; replace with real auth in production
    user_id = 1
    user = User.query.get(user_id)

    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({"error": "User not found"}), 404
