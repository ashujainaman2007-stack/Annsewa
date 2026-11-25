from flask import Blueprint, jsonify, request
from models import Donation, TrackingStep
from database import db
from datetime import datetime

volunteer_bp = Blueprint('volunteers', __name__, url_prefix='/api/volunteers')

@volunteer_bp.route('/tasks', methods=['GET'])
def get_volunteer_tasks():
    status_filter = request.args.get('status', 'open') # open, in_progress, completed

    query = Donation.query

    if status_filter == 'open':
        tasks = query.filter(Donation.status.in_(['Available', 'Claimed'])).all()
    elif status_filter == 'in_progress':
        tasks = query.filter_by(status='Picked Up').all()
    elif status_filter == 'completed':
        tasks = query.filter_by(status='Delivered').all()
    else:
        tasks = query.all()

    return jsonify({
        'success': True,
        'count': len(tasks),
        'tasks': [t.to_dict() for t in tasks]
    })

@volunteer_bp.route('/tasks/<int:donation_id>/claim', methods=['POST'])
def claim_task(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Task not found'}), 404

    data = request.get_json() or {}
    volunteer_name = data.get('volunteer_name', 'Aman Jain')

    donation.assigned_volunteer_name = volunteer_name
    donation.status = 'Picked Up'

    # Update Step 3 & 4
    step3 = TrackingStep.query.filter_by(donation_id=donation_id, step_number=3).first()
    if step3:
        step3.subtitle = volunteer_name
        step3.time_label = 'Today, ' + datetime.now().strftime('%I:%M %p')
        step3.status = 'completed'

    step4 = TrackingStep.query.filter_by(donation_id=donation_id, step_number=4).first()
    if step4:
        step4.time_label = 'Today, ' + datetime.now().strftime('%I:%M %p')
        step4.status = 'completed'

    db.session.commit()

    return jsonify({
        'success': True,
        'message': f'Pickup task assigned to {volunteer_name} and marked as Picked Up!',
        'task': donation.to_dict()
    })

@volunteer_bp.route('/stats', methods=['GET'])
def get_volunteer_stats():
    pickup_tasks = Donation.query.filter(Donation.status.in_(['Claimed', 'Picked Up'])).count()
    completed_tasks = Donation.query.filter_by(status='Delivered').count()

    return jsonify({
        'success': True,
        'pickup_tasks': max(3, pickup_tasks),
        'completed_tasks': max(2, completed_tasks)
    })

