from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  
from config import Config
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app, origins=["http://localhost:5174"])  

    # Import and register blueprints
    from app.routes.auth import auth_bp
    from app.routes.bikes import bikes_bp
    from app.routes.parts import parts_bp
    from app.routes.reviews import reviews_bp
    from app.routes.maintenance import maintenance_bp
    from app.routes.workshop import workshops_bp
    from app.routes.community import community_bp
    from app.routes.subscriptions import subscriptions_bp
    from app.routes.user import user_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(bikes_bp)
    app.register_blueprint(parts_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(maintenance_bp)
    app.register_blueprint(workshops_bp)
    app.register_blueprint(community_bp)
    app.register_blueprint(subscriptions_bp)
    app.register_blueprint(user_bp)

    return app
