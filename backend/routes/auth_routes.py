from flask import Blueprint, jsonify, request
from models import User
from database import db

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    # Return Aman Jain's profile or default active profile
    user = User.query.filter_by(email='amanjain@example.com').first()
    if not user:
        user = User.query.first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'success': True, 'user': user.to_dict()})

@auth_bp.route('/profile', methods=['PUT'])
def update_profile():
    user = User.query.filter_by(email='amanjain@example.com').first()
    if not user:
        user = User.query.first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json() or {}
    if 'name' in data:
        user.name = data['name']
    if 'phone' in data:
        user.phone = data['phone']
    if 'organization_name' in data:
        user.organization_name = data['organization_name']
    
    db.session.commit()
    return jsonify({'success': True, 'user': user.to_dict()})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    role = data.get('role', 'ngo')
    user = User.query.filter_by(role=role).first()
    if not user:
        user = User.query.first()
    return jsonify({'success': True, 'user': user.to_dict() if user else None})

