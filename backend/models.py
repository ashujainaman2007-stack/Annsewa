from datetime import datetime
from database import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    role = db.Column(db.String(20), nullable=False, default='donor') # donor, ngo, volunteer, admin
    organization_name = db.Column(db.String(150), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    avatar_url = db.Column(db.String(255), nullable=True)
    
    # Impact counters for profile
    donations_claimed = db.Column(db.Integer, default=0)
    meals_distributed = db.Column(db.Integer, default=0)
    food_rescued_kg = db.Column(db.Float, default=0.0)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'organization_name': self.organization_name,
            'address': self.address,
            'avatar_url': self.avatar_url,
            'donations_claimed': self.donations_claimed,
            'meals_distributed': self.meals_distributed,
            'food_rescued_kg': self.food_rescued_kg,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class NGO(db.Model):
    __tablename__ = 'ngos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    rating = db.Column(db.Float, default=4.8)
    reviews_count = db.Column(db.Integer, default=120)
    distance_km = db.Column(db.Float, default=2.4)
    address = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    verified = db.Column(db.Boolean, default=True)
    latitude = db.Column(db.Float, default=22.7196)
    longitude = db.Column(db.Float, default=75.8577)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rating': self.rating,
            'reviews_count': self.reviews_count,
            'distance_km': self.distance_km,
            'distance_label': f"{self.distance_km} km",
            'address': self.address,
            'phone': self.phone,
            'email': self.email,
            'verified': self.verified,
            'latitude': self.latitude,
            'longitude': self.longitude
        }


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    donor_name = db.Column(db.String(120), nullable=False, default='Anonymous Donor')
    food_name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=10) # servings
    food_type = db.Column(db.String(30), nullable=False, default='vegetarian') # vegetarian, non-vegetarian
    food_category = db.Column(db.String(50), default='Cooked Meal') # Cooked Meal, Bakery, Packaged
    safe_until = db.Column(db.String(100), nullable=False)
    pickup_location = db.Column(db.String(255), nullable=False)
    
    # Status: Available, Claimed, Picked Up, Delivered, Completed
    status = db.Column(db.String(30), default='Available')
    urgent = db.Column(db.Boolean, default=False)
    
    # Claim and Volunteer Tracking references
    claimed_by_ngo_id = db.Column(db.Integer, nullable=True)
    claimed_by_ngo_name = db.Column(db.String(150), nullable=True)
    assigned_volunteer_id = db.Column(db.Integer, nullable=True)
    assigned_volunteer_name = db.Column(db.String(150), nullable=True)
    
    latitude = db.Column(db.Float, default=22.7196)
    longitude = db.Column(db.Float, default=75.8577)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    tracking_steps = db.relationship('TrackingStep', backref='donation', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'donor_id': self.donor_id,
            'donor_name': self.donor_name,
            'food_name': self.food_name,
            'description': self.description,
            'quantity': self.quantity,
            'food_type': self.food_type,
            'food_category': self.food_category,
            'safe_until': self.safe_until,
            'pickup_location': self.pickup_location,
            'status': self.status,
            'urgent': self.urgent,
            'claimed_by_ngo_id': self.claimed_by_ngo_id,
            'claimed_by_ngo_name': self.claimed_by_ngo_name,
            'assigned_volunteer_id': self.assigned_volunteer_id,
            'assigned_volunteer_name': self.assigned_volunteer_name,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'tracking_steps': [step.to_dict() for step in self.tracking_steps]
        }


class TrackingStep(db.Model):
    __tablename__ = 'tracking_steps'

    id = db.Column(db.Integer, primary_key=True)
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.id'), nullable=False)
    step_number = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    subtitle = db.Column(db.String(150), nullable=True)
    time_label = db.Column(db.String(60), nullable=False)
    # Status: completed, current, pending
    status = db.Column(db.String(20), default='pending')

    def to_dict(self):
        return {
            'id': self.id,
            'step_number': self.step_number,
            'title': self.title,
            'subtitle': self.subtitle,
            'time': self.time_label,
            'status': self.status
        }


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    recipient_type = db.Column(db.String(20), default='ngo')  # 'ngo', 'volunteer', 'donor', 'all'
    recipient_id = db.Column(db.Integer, nullable=True)
    recipient_name = db.Column(db.String(150), nullable=True)  # e.g. "Seva Foundation"
    title = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(40), default='food_available')  # 'food_available', 'donation_claimed', 'task_assigned'
    donation_id = db.Column(db.Integer, db.ForeignKey('donations.id', ondelete='CASCADE'), nullable=True)
    food_name = db.Column(db.String(150), nullable=True)
    quantity = db.Column(db.Integer, nullable=True)
    pickup_location = db.Column(db.String(255), nullable=True)
    safe_until = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(30), default='Available')  # 'Available', 'Claimed'
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    donation = db.relationship('Donation', backref='notifications', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'recipient_type': self.recipient_type,
            'recipient_id': self.recipient_id,
            'recipient_name': self.recipient_name,
            'title': self.title,
            'message': self.message,
            'type': self.type,
            'donation_id': self.donation_id,
            'food_name': self.food_name or (self.donation.food_name if self.donation else None),
            'quantity': self.quantity or (self.donation.quantity if self.donation else 50),
            'pickup_location': self.pickup_location or (self.donation.pickup_location if self.donation else ''),
            'safe_until': self.safe_until or (self.donation.safe_until if self.donation else ''),
            'status': self.donation.status if self.donation else self.status,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'time_ago': 'Just now'
        }


