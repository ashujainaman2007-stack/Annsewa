from flask import Blueprint, jsonify, request
from models import Donation, TrackingStep, User, NGO, Notification
from database import db
from datetime import datetime

donation_bp = Blueprint('donations', __name__, url_prefix='/api/donations')

@donation_bp.route('', methods=['GET'])
def get_donations():
    status_filter = request.args.get('status')
    food_type_filter = request.args.get('food_type')
    search = request.args.get('search')

    query = Donation.query

    if status_filter:
        query = query.filter_by(status=status_filter)
    if food_type_filter:
        query = query.filter_by(food_type=food_type_filter)
    if search:
        query = query.filter(
            (Donation.food_name.ilike(f'%{search}%')) |
            (Donation.pickup_location.ilike(f'%{search}%'))
        )

    donations = query.order_by(Donation.created_at.desc()).all()
    return jsonify({
        'success': True,
        'count': len(donations),
        'donations': [d.to_dict() for d in donations]
    })

@donation_bp.route('/available', methods=['GET'])
def get_available_donations():
    donations = Donation.query.filter(Donation.status.in_(['Available', 'Claimed'])).order_by(Donation.created_at.desc()).all()
    return jsonify({
        'success': True,
        'count': len(donations),
        'donations': [d.to_dict() for d in donations]
    })

@donation_bp.route('/<int:donation_id>', methods=['GET'])
def get_donation(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404
    return jsonify({'success': True, 'donation': donation.to_dict()})

@donation_bp.route('', methods=['POST'])
def create_donation():
    data = request.get_json() or {}

    food_name = data.get('food_name')
    if not food_name:
        return jsonify({'error': 'Food name is required'}), 400

    new_donation = Donation(
        donor_id=data.get('donor_id', 1),
        donor_name=data.get('donor_name', 'Campus Donor'),
        food_name=food_name,
        description=data.get('description', 'Fresh and hygienic surplus food.'),
        quantity=int(data.get('quantity', 50)),
        food_type=data.get('food_type', 'vegetarian'),
        food_category=data.get('food_category', 'Cooked Meal'),
        safe_until=data.get('safe_until', 'Today, 08:00 PM'),
        pickup_location=data.get('pickup_location', 'AITR Canteen, Indore'),
        status='Available',
        urgent=bool(data.get('urgent', False)),
        latitude=float(data.get('latitude', 22.7196)),
        longitude=float(data.get('longitude', 75.8577))
    )

    db.session.add(new_donation)
    db.session.flush()

    # Automatically create initial tracking step
    step1 = TrackingStep(
        donation_id=new_donation.id,
        step_number=1,
        title='Donation Listed',
        subtitle=None,
        time_label='Today, ' + datetime.now().strftime('%I:%M %p'),
        status='completed'
    )
    step2 = TrackingStep(
        donation_id=new_donation.id,
        step_number=2,
        title='Claimed by NGO',
        subtitle='Pending assignment',
        time_label='Pending',
        status='pending'
    )
    step3 = TrackingStep(
        donation_id=new_donation.id,
        step_number=3,
        title='Volunteer Assigned',
        subtitle='Pending volunteer',
        time_label='Pending',
        status='pending'
    )
    step4 = TrackingStep(
        donation_id=new_donation.id,
        step_number=4,
        title='Picked Up',
        subtitle=None,
        time_label='Pending',
        status='pending'
    )
    step5 = TrackingStep(
        donation_id=new_donation.id,
        step_number=5,
        title='Delivered',
        subtitle=None,
        time_label='Pending',
        status='pending'
    )

    db.session.add_all([step1, step2, step3, step4, step5])

    # Automatically notify all nearby NGOs about the newly available food!
    all_ngos = NGO.query.all()
    notified_names = []
    for ngo in all_ngos:
        notif = Notification(
            recipient_type='ngo',
            recipient_id=ngo.id,
            recipient_name=ngo.name,
            title='🍲 New Food Available!',
            message=f"{new_donation.food_name} ({new_donation.quantity} servings) donated at {new_donation.pickup_location}. Safe until {new_donation.safe_until}.",
            type='food_available',
            donation_id=new_donation.id,
            food_name=new_donation.food_name,
            quantity=new_donation.quantity,
            pickup_location=new_donation.pickup_location,
            safe_until=new_donation.safe_until,
            status='Available',
            is_read=False
        )
        db.session.add(notif)
        notified_names.append(ngo.name)

    db.session.commit()

    return jsonify({
        'success': True,
        'message': f'Donation listed successfully! {len(notified_names)} nearby NGOs have been notified.',
        'notified_ngos_count': len(notified_names),
        'notified_ngos': notified_names,
        'donation': new_donation.to_dict()
    }), 201

@donation_bp.route('/<int:donation_id>/claim', methods=['POST'])
def claim_donation(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    data = request.get_json() or {}
    ngo_name = data.get('ngo_name', 'Seva Foundation')

    donation.status = 'Claimed'
    donation.claimed_by_ngo_name = ngo_name

    # Update Step 2 in tracking
    step2 = TrackingStep.query.filter_by(donation_id=donation_id, step_number=2).first()
    if step2:
        step2.subtitle = ngo_name
        step2.time_label = 'Today, ' + datetime.now().strftime('%I:%M %p')
        step2.status = 'completed'

    # Update all notifications for this donation to show Claimed status
    Notification.query.filter_by(donation_id=donation_id).update({'status': 'Claimed'})

    # Create confirmation notification for the Donor
    donor_notif = Notification(
        recipient_type='donor',
        recipient_id=donation.donor_id,
        recipient_name=donation.donor_name,
        title='🎉 Your Donation Was Claimed!',
        message=f"{ngo_name} has claimed your donation of {donation.food_name}. Pickup is being scheduled.",
        type='donation_claimed',
        donation_id=donation.id,
        food_name=donation.food_name,
        quantity=donation.quantity,
        pickup_location=donation.pickup_location,
        safe_until=donation.safe_until,
        status='Claimed',
        is_read=False
    )
    db.session.add(donor_notif)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': f'Donation claimed by {ngo_name}!',
        'donation': donation.to_dict()
    })

