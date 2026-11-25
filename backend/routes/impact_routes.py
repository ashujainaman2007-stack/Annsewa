from flask import Blueprint, jsonify

impact_bp = Blueprint('impact', __name__, url_prefix='/api/impact')

@impact_bp.route('', methods=['GET'])
def get_impact():
    return jsonify({
        'success': True,
        'meals_saved': 1240,
        'food_rescued_kg': 198,
        'active_donors': 28,
        'active_ngos': 10,
        'campus_headline': 'Together for a Zero Food Waste Campus'
    })

@impact_bp.route('/weekly', methods=['GET'])
def get_weekly_chart():
    return jsonify({
        'success': True,
        'history': [
            {'day': 'Mon', 'meals': 35},
            {'day': 'Tue', 'meals': 65},
            {'day': 'Wed', 'meals': 95},
            {'day': 'Thu', 'meals': 45},
            {'day': 'Fri', 'meals': 85},
            {'day': 'Sat', 'meals': 110},
            {'day': 'Sun', 'meals': 130}
        ]
    })

@impact_bp.route('/monthly', methods=['GET'])
def get_monthly_summary():
    return jsonify({
        'success': True,
        'this_month': {
            'donations': 5,
            'pickups': 4,
            'delivered': 4
        }
    })

