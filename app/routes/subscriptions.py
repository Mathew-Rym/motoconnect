from flask import Blueprint, request, jsonify
from app import db
from app.models.subscription import Subscription

subscriptions_bp = Blueprint('subscriptions', __name__)
@subscriptions_bp.route('/subscriptions', methods=['GET'])
def get_subscriptions():
    user_id = request.args.get('user_id')
    subs = Subscription.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": s.id, "target_id": s.target_id, "type": s.target_type} for s in subs])

@subscriptions_bp.route('/subscriptions', methods=['POST'])
def create_subscription():
    data = request.get_json()
    user_id = data.get("user_id")
    sub = Subscription(user_id=user_id, target_id=data["target_id"], target_type=data["target_type"])
    db.session.add(sub)
    db.session.commit()
    return jsonify({"message": "Subscribed"}), 201

@subscriptions_bp.route('/subscriptions/<int:id>', methods=['DELETE'])
def delete_subscription(id):
    sub = Subscription.query.get_or_404(id)
    db.session.delete(sub)
    db.session.commit()
    return jsonify({"message": "Unsubscribed"}), 200
