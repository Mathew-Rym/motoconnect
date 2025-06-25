from flask import Blueprint, request, jsonify
from app import db
from app.models.maintenance import MaintenanceRecord
from flask_jwt_extended import jwt_required, get_jwt_identity

maintenance_bp = Blueprint('maintenance', __name__)

@maintenance_bp.route('/maintenance', methods=['GET'])
def get_maintenance():
    records = MaintenanceRecord.query.all()
    return jsonify([{"id": r.id, "type": r.type, "mileage": r.mileage} for r in records])

@maintenance_bp.route('/maintenance', methods=['POST'])
@jwt_required()
def add_maintenance():
    data = request.get_json()
    user_id = get_jwt_identity()
    record = MaintenanceRecord(
        date=data["date"], type=data["type"], notes=data["notes"],
        cost=data["cost"], mileage=data["mileage"],
        bike_id=data["bike_id"], user_id=user_id
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Maintenance record added"}), 201
