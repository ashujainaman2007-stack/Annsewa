from flask import Blueprint, jsonify, request
from models import Notification, NGO, Donation
from database import db
from datetime import datetime

notification_bp = Blueprint('notifications', __name__, url_prefix='/api/notifications')

@notification_bp.route('', methods=['GET'])
def get_notifications():
    recipient_type = request.args.get('recipient_type')
    status_filter = request.args.get('status')
    unread_only = request.args.get('unread')

    query = Notification.query

    if recipient_type and recipient_type != 'all':
        query = query.filter_by(recipient_type=recipient_type)
    if status_filter:
        query = query.filter_by(status=status_filter)
    if unread_only and unread_only.lower() == 'true':
        query = query.filter_by(is_read=False)

    notifications = query.order_by(Notification.created_at.desc()).all()
    unread_count = Notification.query.filter_by(is_read=False).count()

    return jsonify({
        'success': True,
        'count': len(notifications),
        'unread_count': unread_count,
        'notifications': [n.to_dict() for n in notifications]
    })

@notification_bp.route('/unread-count', methods=['GET'])
def get_unread_count():
    unread_count = Notification.query.filter_by(is_read=False).count()
    return jsonify({
        'success': True,
        'unread_count': unread_count
    })

@notification_bp.route('/<int:notification_id>/read', methods=['POST'])
def mark_read(notification_id):
    notif = Notification.query.get(notification_id)
    if not notif:
        return jsonify({'error': 'Notification not found'}), 404

    notif.is_read = True
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Marked as read',
        'notification': notif.to_dict()
    })

@notification_bp.route('/mark-all-read', methods=['POST'])
def mark_all_read():
    Notification.query.update({'is_read': True})
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'All notifications marked as read'
    })

@notification_bp.route('/broadcast-food', methods=['POST'])
def broadcast_food():
    data = request.get_json() or {}
    donation_id = data.get('donation_id')
    donation = Donation.query.get(donation_id) if donation_id else None

    food_name = data.get('food_name', donation.food_name if donation else 'Surplus Food')
    quantity = data.get('quantity', donation.quantity if donation else 50)
    pickup_location = data.get('pickup_location', donation.pickup_location if donation else 'Campus Canteen')
    safe_until = data.get('safe_until', donation.safe_until if donation else 'Today, 8:00 PM')

    ngos = NGO.query.all()
    created_notifs = []

    for ngo in ngos:
        notif = Notification(
            recipient_type='ngo',
            recipient_id=ngo.id,
            recipient_name=ngo.name,
            title='🍲 New Food Available!',
            message=f"{food_name} ({quantity} servings) donated at {pickup_location}. Safe until {safe_until}.",
            type='food_available',
            donation_id=donation.id if donation else None,
            food_name=food_name,
            quantity=quantity,
            pickup_location=pickup_location,
            safe_until=safe_until,
            status='Available',
            is_read=False
        )
        db.session.add(notif)
        created_notifs.append(notif)

    db.session.commit()

    return jsonify({
        'success': True,
        'message': f'Alert sent to {len(created_notifs)} nearby NGOs',
        'notified_count': len(created_notifs),
        'notifications': [n.to_dict() for n in created_notifs]
    }), 201

