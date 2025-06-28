from flask import Blueprint, request, jsonify
from app import db
from app.models.review import Review

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{"id": r.id, "content": r.content, "rating": r.rating} for r in reviews])

@reviews_bp.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    review = Review(
        content=data["content"],
        rating=data["rating"],
        user_id=data.get("user_id"), 
        bike_id=data.get("bike_id"),
        workshop_id=data.get("workshop_id")
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review added"}), 201
