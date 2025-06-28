from flask import Blueprint, request, jsonify
from app import db
from app.models.part import Part

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
def create_part():
    data = request.get_json()
    part = Part(
        name=data["name"], category=data["category"], price=data["price"],
        condition=data["condition"], description=data["description"],
        images=data.get("images", []),
        user_id=data.get("user_id")  
    )
    db.session.add(part)
    db.session.commit()
    return jsonify({"message": "Part created"}), 201

@parts_bp.route('/part/<int:id>', methods=['DELETE'])
def delete_part(id):
    part = Part.query.get_or_404(id)
    db.session.delete(part)
    db.session.commit()
    return jsonify({"message": "Part deleted"}), 200
