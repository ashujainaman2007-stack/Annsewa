import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from database import db

# Import Blueprints
from routes.auth_routes import auth_bp
from routes.donation_routes import donation_bp
from routes.ngo_routes import ngo_bp
from routes.volunteer_routes import volunteer_bp
from routes.tracking_routes import tracking_bp
from routes.impact_routes import impact_bp
from routes.notification_routes import notification_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for React frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize SQLAlchemy Database
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(donation_bp)
    app.register_blueprint(ngo_bp)
    app.register_blueprint(volunteer_bp)
    app.register_blueprint(tracking_bp)
    app.register_blueprint(impact_bp)
    app.register_blueprint(notification_bp)

    @app.route('/')
    def root():
        return jsonify({
            'name': 'Annsewa API Server',
            'version': '1.0.0',
            'status': 'online',
            'database': 'SQLite (annsewa.db)',
            'endpoints': [
                '/api/auth/profile',
                '/api/donations',
                '/api/donations/available',
                '/api/ngos',
                '/api/ngos/nearby',
                '/api/volunteers/tasks',
                '/api/tracking/1',
                '/api/impact',
                '/api/impact/weekly',
                '/api/impact/monthly'
            ]
        })

    @app.route('/api/health')
    def health():
        return jsonify({'status': 'healthy', 'service': 'annsewa-backend'})

    # Auto-seed database if SQLite DB does not exist
    db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'annsewa.db')
    if not os.path.exists(db_path):
        from seed import seed_database
        seed_database(app)

    return app

if __name__ == '__main__':
    app = create_app()
    print("Starting Annsewa Flask Backend on port 5000 with SQLite database...")
    app.run(host='0.0.0.0', port=5000, debug=True)
