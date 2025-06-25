from flask import Blueprint, request, jsonify
from app.models.workshop import Workshop
from app import db

workshops_bp = Blueprint('workshops', __name__, url_prefix='/workshops')

@workshops_bp.route('/', methods=['GET'])
def get_workshops():
    return jsonify({"message": "List of workshops coming soon"}), 200
