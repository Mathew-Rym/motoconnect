from flask import Blueprint, request, jsonify
from app import db
from app.models.workshop import Workshop

workshops_bp = Blueprint('workshops', __name__)
@workshops_bp.route('/workshops', methods=['GET'])
def get_workshops():
    workshops = Workshop.query.all()
    return jsonify([{"id": w.id, "name": w.name, "location": w.location} for w in workshops])

@workshops_bp.route('/workshop', methods=['POST'])
def create_workshop():
    data = request.get_json()
    workshop = Workshop(
        name=data["name"], location=data["location"],
        description=data["description"], services=data.get("services", []),
        rating_avg=data.get("rating_avg", 0)
    )
    db.session.add(workshop)
    db.session.commit()
    return jsonify({"message": "Workshop created"}), 201
