import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from database import db
from models import User, NGO, Donation, TrackingStep, Notification

def seed_database(app):
    with app.app_context():
        # Drop all tables and recreate clean schema
        db.drop_all()
        db.create_all()

        print("Creating seed data for Annsewa SQLite Database...")

        # 1. Create Users
        aman = User(
            name="Aman Jain",
            email="amanjain@example.com",
            phone="+91 98765 43210",
            role="ngo",
            organization_name="Seva Foundation",
            address="Vijay Nagar, Indore, MP",
            donations_claimed=24,
            meals_distributed=1240,
            food_rescued_kg=198.0
        )

        canteen_donor = User(
            name="AITR Main Canteen",
            email="canteen@aitr.ac.in",
            phone="+91 98260 11223",
            role="donor",
            organization_name="AITR Campus Dining",
            address="AITR Campus, Manglia, Indore"
        )

        volunteer_user = User(
            name="Rahul Sharma",
            email="rahul.volunteer@example.com",
            phone="+91 91234 56789",
            role="volunteer",
            organization_name="Annsewa Volunteer Fleet",
            address="Palasia, Indore"
        )

        db.session.add_all([aman, canteen_donor, volunteer_user])
        db.session.commit()

        # 2. Create 5 Verified Nearby NGOs
        seva = NGO(
            name="Seva Foundation",
            rating=4.8,
            reviews_count=120,
            distance_km=2.4,
            address="Plot 12, Scheme 54, Vijay Nagar, Indore",
            phone="+91 98765 43210",
            email="contact@sevafoundation.org",
            verified=True,
            latitude=22.7533,
            longitude=75.8937
        )

        food_for_all = NGO(
            name="Food For All Trust",
            rating=4.2,
            reviews_count=89,
            distance_km=3.1,
            address="Bhawarkua Main Rd, Indore",
            phone="+91 98111 22334",
            email="help@foodforalltrust.org",
            verified=True,
            latitude=22.6926,
            longitude=75.8676
        )

        robin_hood = NGO(
            name="Robin Hood Army Indore",
            rating=4.9,
            reviews_count=210,
            distance_km=1.8,
            address="Palasia Square, AB Road, Indore",
            phone="+91 98222 33445",
            email="indore@robinhoodarmy.com",
            verified=True,
            latitude=22.7244,
            longitude=75.8839
        )

        annapurna = NGO(
            name="Annapurna Seva Sansthan",
            rating=4.7,
            reviews_count=154,
            distance_km=2.9,
            address="Geeta Bhavan Rd, Manoramaganj, Indore",
            phone="+91 98333 44556",
            email="annapurna.indore@org.in",
            verified=True,
            latitude=22.7180,
            longitude=75.8790
        )

        roti_bank = NGO(
            name="Roti Bank Indore",
            rating=4.6,
            reviews_count=98,
            distance_km=3.5,
            address="Rajwada Circle, M.G. Road, Indore",
            phone="+91 98444 55667",
            email="rotibank.indore@gmail.com",
            verified=True,
            latitude=22.7198,
            longitude=75.8550
        )

        db.session.add_all([seva, food_for_all, robin_hood, annapurna, roti_bank])
        db.session.commit()

        # 3. Create Core Donations matching the design
        donation1 = Donation(
            donor_id=canteen_donor.id,
            donor_name="AITR Canteen",
            food_name="Vegetable Pulao & Dal",
            description="Freshly prepared vegetable pulao with yellow dal tadka, hygienically packed.",
            quantity=50,
            food_type="vegetarian",
            food_category="Cooked Meal",
            safe_until="Today, 8:00 PM",
            pickup_location="AITR Main Canteen, Indore",
            status="Claimed",
            urgent=True,
            claimed_by_ngo_id=seva.id,
            claimed_by_ngo_name="Seva Foundation",
            assigned_volunteer_id=aman.id,
            assigned_volunteer_name="Aman Jain",
            latitude=22.7925,
            longitude=75.9298
        )

        donation2 = Donation(
            donor_id=canteen_donor.id,
            donor_name="Hostel Mess",
            food_name="Roti & Sabzi",
            description="Fresh wheat rotis and paneer mix sabzi from college hostel mess.",
            quantity=30,
            food_type="vegetarian",
            food_category="Cooked Meal",
            safe_until="Today, 9:00 PM",
            pickup_location="Hostel Mess Block B, Indore",
            status="Available",
            urgent=False,
            latitude=22.7930,
            longitude=75.9280
        )

        donation3 = Donation(
            donor_id=canteen_donor.id,
            donor_name="Campus Café",
            food_name="Bread & Snacks",
            description="Fresh bakery items, vegetable sandwiches, and samosas.",
            quantity=30,
            food_type="vegetarian",
            food_category="Bakery",
            safe_until="Today, 9:00 PM",
            pickup_location="Campus Café, At Ramp, Indore",
            status="Picked Up",
            urgent=False,
            claimed_by_ngo_id=seva.id,
            claimed_by_ngo_name="Seva Foundation",
            assigned_volunteer_id=volunteer_user.id,
            assigned_volunteer_name="Rahul Sharma",
            latitude=22.7918,
            longitude=75.9305
        )

        donation4 = Donation(
            donor_id=canteen_donor.id,
            donor_name="Student Union Hall",
            food_name="Rice & Curry",
            description="Steamed basmati rice and rajma curry from university event.",
            quantity=40,
            food_type="vegetarian",
            food_category="Cooked Meal",
            safe_until="Yesterday, 06:40 PM",
            pickup_location="Campus Auditorium, Indore",
            status="Delivered",
            urgent=False,
            claimed_by_ngo_id=seva.id,
            claimed_by_ngo_name="Seva Foundation",
            latitude=22.7910,
            longitude=75.9290
        )

        db.session.add_all([donation1, donation2, donation3, donation4])
        db.session.commit()

        # 4. Create Tracking Steps for Donation #1 (Matching the exact Timeline!)
        steps = [
            TrackingStep(
                donation_id=donation1.id,
                step_number=1,
                title="Donation Listed",
                subtitle=None,
                time_label="Today, 10:30 AM",
                status="completed"
            ),
            TrackingStep(
                donation_id=donation1.id,
                step_number=2,
                title="Claimed by NGO",
                subtitle="Seva Foundation",
                time_label="Today, 11:00 AM",
                status="completed"
            ),
            TrackingStep(
                donation_id=donation1.id,
                step_number=3,
                title="Volunteer Assigned",
                subtitle="Aman Jain",
                time_label="Today, 11:15 AM",
                status="completed"
            ),
            TrackingStep(
                donation_id=donation1.id,
                step_number=4,
                title="Picked Up",
                subtitle=None,
                time_label="Today, 12:05 PM",
                status="completed"
            ),
            TrackingStep(
                donation_id=donation1.id,
                step_number=5,
                title="Delivered",
                subtitle=None,
                time_label="Pending",
                status="pending"
            )
        ]

        db.session.add_all(steps)
        db.session.commit()

        # 5. Create Initial Seed Notifications for Available Food Donations (Sent to NGOs)
        initial_notifs = [
            Notification(
                recipient_type='ngo',
                recipient_id=seva.id,
                recipient_name='Seva Foundation',
                title='🍲 New Food Available!',
                message=f"Roti & Sabzi (30 servings) donated at Hostel Mess Block B. Safe until Today, 9:00 PM.",
                type='food_available',
                donation_id=donation2.id,
                food_name=donation2.food_name,
                quantity=donation2.quantity,
                pickup_location=donation2.pickup_location,
                safe_until=donation2.safe_until,
                status='Available',
                is_read=False
            ),
            Notification(
                recipient_type='ngo',
                recipient_id=food_for_all.id,
                recipient_name='Food For All Trust',
                title='🍲 New Food Available!',
                message=f"Roti & Sabzi (30 servings) donated at Hostel Mess Block B. Safe until Today, 9:00 PM.",
                type='food_available',
                donation_id=donation2.id,
                food_name=donation2.food_name,
                quantity=donation2.quantity,
                pickup_location=donation2.pickup_location,
                safe_until=donation2.safe_until,
                status='Available',
                is_read=False
            ),
            Notification(
                recipient_type='ngo',
                recipient_id=robin_hood.id,
                recipient_name='Robin Hood Army Indore',
                title='🍲 New Food Available!',
                message=f"Roti & Sabzi (30 servings) donated at Hostel Mess Block B. Safe until Today, 9:00 PM.",
                type='food_available',
                donation_id=donation2.id,
                food_name=donation2.food_name,
                quantity=donation2.quantity,
                pickup_location=donation2.pickup_location,
                safe_until=donation2.safe_until,
                status='Available',
                is_read=False
            ),
            Notification(
                recipient_type='donor',
                recipient_id=canteen_donor.id,
                recipient_name='AITR Main Canteen',
                title='🎉 Your Donation Was Claimed!',
                message=f"Seva Foundation has claimed your donation of Vegetable Pulao & Dal.",
                type='donation_claimed',
                donation_id=donation1.id,
                food_name=donation1.food_name,
                quantity=donation1.quantity,
                pickup_location=donation1.pickup_location,
                safe_until=donation1.safe_until,
                status='Claimed',
                is_read=True
            )
        ]

        db.session.add_all(initial_notifs)
        db.session.commit()

        print("SQLite Database initialized and seeded successfully at:", app.config['SQLALCHEMY_DATABASE_URI'])

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    seed_database(app)
