from flask import Blueprint, request, jsonify
from app import db
from app.models.part import Part
from flask_jwt_extended import jwt_required, get_jwt_identity

parts_bp = Blueprint('parts', __name__)

@parts_bp.route('/parts', methods=['GET'])
def get_parts():
    parts = Part.query.all()
    return jsonify([{"id": p.id, "name": p.name, "price": p.price} for p in parts])

@parts_bp.route('/part/<int:id>', methods=['GET'])
def get_part(id):
    part = Part.query.get_or_404(id)
    return jsonify({"id": part.id, "name": part.name, "description": part.description})

@parts_bp.route('/part', methods=['POST'])
@jwt_required()
def create_part():
    data = request.get_json()
    user_id = get_jwt_identity()
    part = Part(
        name=data["name"], category=data["category"], price=data["price"],
        condition=data["condition"], description=data["description"],
        images=data.get("images", []), user_id=user_id
    )
    db.session.add(part)
    db.session.commit()
    return jsonify({"message": "Part created"}), 201

@parts_bp.route('/part/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_part(id):
    part = Part.query.get_or_404(id)
    db.session.delete(part)
    db.session.commit()
    return jsonify({"message": "Part deleted"}), 200
