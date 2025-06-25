from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User

user_bp = Blueprint("users", __name__)

# GET /user/<id> - Get user details (protected)
@user_bp.route("/user/<int:id>", methods=["GET"])
@jwt_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200

# PUT /user/<id> - Update user details (protected)
@user_bp.route("/user/<int:id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    user = User.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    if user.id != current_user_id:
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.location = data.get("location", user.location)

    db.session.commit()
    return jsonify(user.to_dict()), 200
