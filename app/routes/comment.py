
from flask import Blueprint, request, jsonify
from app import db
from app.models.comment import Comment
from app.models.motorbike import Motorbike
from app.models.user import User

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/bike/<int:bike_id>/comments', methods=['GET'])
def get_bike_comments(bike_id):
    bike = Motorbike.query.get_or_404(bike_id)
    comments = Comment.query.filter_by(motorbike_id=bike.id).all()
    return jsonify([comment.to_dict() for comment in comments]), 200

@comments_bp.route('/bike/<int:bike_id>/comments', methods=['POST'])
def post_bike_comment(bike_id):
    data = request.get_json()
    if not data.get('content') or not data.get('user_id'):
        return jsonify({"error": "Content and user_id are required"}), 400

    # Ensure user exists
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Ensure bike exists
    bike = Motorbike.query.get(bike_id)
    if not bike:
        return jsonify({"error": "Bike not found"}), 404

    comment = Comment(
        content=data['content'],
        user_id=data['user_id'],
        motorbike_id=bike_id
    )
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.to_dict()), 201
