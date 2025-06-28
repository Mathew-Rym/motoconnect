from flask import Blueprint, request, jsonify
from app import db
from app.models.motorbike import Motorbike
from app.models.user import User

bikes_bp = Blueprint('bikes', __name__)

# ---------------------------
# GET all bikes
# ---------------------------
@bikes_bp.route('/bikes', methods=['GET'])
def get_bikes():
    bikes = Motorbike.query.all()
    return jsonify([
        {
            "id": b.id,
            "brand": b.brand,
            "model": b.model,
            "year": b.year,
            "price": b.price,
            "mileage": b.mileage,
            "location": b.location,
            "description": b.description,
            "user_id": b.user_id,
            "images": b.images
        } for b in bikes
    ]), 200

# ---------------------------
# GET one bike by ID
# ---------------------------
@bikes_bp.route('/bike/<int:id>', methods=['GET'])
def get_bike(id):
    bike = Motorbike.query.get_or_404(id)
    return jsonify({
        "id": bike.id,
        "brand": bike.brand,
        "model": bike.model,
        "year": bike.year,
        "price": bike.price,
        "mileage": bike.mileage,
        "description": bike.description,
        "location": bike.location,
        "user_id": bike.user_id,
        "images": bike.images
    }), 200

# ---------------------------
# POST create a bike
# ---------------------------
@bikes_bp.route('/bike', methods=['POST'])
@bikes_bp.route('/bikes', methods=['POST'])
def create_bike():
    data = request.get_json()

    required_fields = ['brand', 'model', 'year', 'price', 'mileage', 'description', 'location', 'user_id']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"error": "Invalid user ID"}), 400

    bike = Motorbike(
        brand=data['brand'],
        model=data['model'],
        year=data['year'],
        price=data['price'],
        mileage=data['mileage'],
        description=data['description'],
        location=data['location'],
        images=data.get('images', []),
        user_id=data['user_id']
    )

    db.session.add(bike)
    db.session.commit()

    return jsonify({
        "message": "Bike created",
        "bike": {
            "id": bike.id,
            "brand": bike.brand,
            "model": bike.model,
            "year": bike.year,
            "price": bike.price,
            "mileage": bike.mileage,
            "description": bike.description,
            "location": bike.location,
            "user_id": bike.user_id,
            "images": bike.images
        }
    }), 201

# ---------------------------
# PUT update a bike
# ---------------------------
@bikes_bp.route('/bike/<int:id>', methods=['PUT'])
def update_bike(id):
    bike = Motorbike.query.get_or_404(id)
    data = request.get_json()

    for key, value in data.items():
        if hasattr(bike, key):
            setattr(bike, key, value)

    db.session.commit()
    return jsonify({"message": "Bike updated"}), 200

# ---------------------------
# DELETE a bike
# ---------------------------
@bikes_bp.route('/bike/<int:id>', methods=['DELETE'])
def delete_bike(id):
    bike = Motorbike.query.get_or_404(id)
    db.session.delete(bike)
    db.session.commit()
    return jsonify({"message": "Bike deleted"}), 200
