from flask import Blueprint, request, jsonify
from app import db
from app.models.review import Review
from flask_jwt_extended import jwt_required, get_jwt_identity

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{"id": r.id, "content": r.content, "rating": r.rating} for r in reviews])

@reviews_bp.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    user_id = get_jwt_identity()
    review = Review(
        content=data["content"], rating=data["rating"],
        user_id=user_id, bike_id=data.get("bike_id"),
        workshop_id=data.get("workshop_id")
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review added"}), 201
