from flask import Blueprint, jsonify
from models import Donation, TrackingStep

tracking_bp = Blueprint('tracking', __name__, url_prefix='/api/tracking')

@tracking_bp.route('/<int:donation_id>', methods=['GET'])
def get_tracking(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    steps = TrackingStep.query.filter_by(donation_id=donation_id).order_by(TrackingStep.step_number.asc()).all()
    
    return jsonify({
        'success': True,
        'donation': donation.to_dict(),
        'steps': [s.to_dict() for s in steps]
    })

