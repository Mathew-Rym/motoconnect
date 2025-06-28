from flask import Blueprint, request, jsonify
from app import db
from app.models.maintenance import MaintenanceRecord

maintenance_bp = Blueprint('maintenance', __name__)
@maintenance_bp.route('/maintenance', methods=['GET'])
def get_maintenance():
    records = MaintenanceRecord.query.all()
    return jsonify([
        {
            "id": r.id,
            "date": r.date,
            "maintenance_type": r.maintenance_type,
            "notes": r.notes,
            "cost": r.cost,
            "mileage": r.mileage,
            "bike_id": r.bike_id,
            "user_id": r.user_id
        } for r in records
    ]), 200

@maintenance_bp.route('/maintenance', methods=['POST'])
def add_maintenance():
    data = request.get_json()

    required_fields = ['date', 'maintenance_type', 'notes', 'cost', 'mileage', 'bike_id', 'user_id']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    record = MaintenanceRecord(
        date=data['date'],
        maintenance_type=data['maintenance_type'],
        notes=data['notes'],
        cost=data['cost'],
        mileage=data['mileage'],
        bike_id=data['bike_id'],
        user_id=data['user_id']
    )

    db.session.add(record)
    db.session.commit()
    return jsonify({"message": "Maintenance record added"}), 201
