from flask import Blueprint, request, jsonify
from app import db
from app.models.post import Post
from app.models.comment import Comment
from flask_jwt_extended import jwt_required, get_jwt_identity

community_bp = Blueprint('community', __name__)

@community_bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{"id": p.id, "title": p.title} for p in posts])

@community_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    user_id = get_jwt_identity()
    post = Post(title=data["title"], content=data["content"], tags=data.get("tags", []), user_id=user_id)
    db.session.add(post)
    db.session.commit()
    return jsonify({"message": "Post created"}), 201

@community_bp.route('/posts/<int:id>/comments', methods=['POST'])
@jwt_required()
def add_comment(id):
    data = request.get_json()
    user_id = get_jwt_identity()
    comment = Comment(content=data["content"], user_id=user_id, post_id=id)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added"}), 201
