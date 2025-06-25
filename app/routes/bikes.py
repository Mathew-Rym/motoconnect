from flask import Blueprint, request, jsonify
from app import db
from app.models.motorbike import Motorbike
from flask_jwt_extended import jwt_required, get_jwt_identity

bikes_bp = Blueprint('bikes', __name__)

@bikes_bp.route('/bikes', methods=['GET'])
def get_bikes():
    bikes = Motorbike.query.all()
    return jsonify([{"id": b.id, "brand": b.brand, "model": b.model} for b in bikes])

@bikes_bp.route('/bike/<int:id>', methods=['GET'])
def get_bike(id):
    bike = Motorbike.query.get_or_404(id)
    return jsonify({
        "id": bike.id,
        "brand": bike.brand,
        "model": bike.model,
        "description": bike.description
    })

@bikes_bp.route('/bike', methods=['POST'])
@jwt_required()
def create_bike():
    data = request.get_json()
    user_id = get_jwt_identity()
    bike = Motorbike(
        brand=data['brand'], model=data['model'], year=data['year'],
        price=data['price'], mileage=data['mileage'],
        description=data['description'], location=data['location'],
        images=data.get('images', []), user_id=user_id
    )
    db.session.add(bike)
    db.session.commit()
    return jsonify({"message": "Bike created"}), 201

@bikes_bp.route('/bike/<int:id>', methods=['PUT'])
@jwt_required()
def update_bike(id):
    data = request.get_json()
    bike = Motorbike.query.get_or_404(id)
    for key, value in data.items():
        setattr(bike, key, value)
    db.session.commit()
    return jsonify({"message": "Bike updated"}), 200

@bikes_bp.route('/bike/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_bike(id):
    bike = Motorbike.query.get_or_404(id)
    db.session.delete(bike)
    db.session.commit()
    return jsonify({"message": "Bike deleted"}), 200
