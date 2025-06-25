from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from dotenv import load_dotenv
load_dotenv()


db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.bikes import bikes_bp
    from app.routes.parts import parts_bp
    from app.routes.reviews import reviews_bp
    from app.routes.maintenance import maintenance_bp
    from app.routes.workshops import workshops_bp
    from app.routes.community import community_bp
    from app.routes.subscriptions import subscriptions_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(bikes_bp)
    app.register_blueprint(parts_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(maintenance_bp)
    app.register_blueprint(workshops_bp)
    app.register_blueprint(community_bp)
    app.register_blueprint(subscriptions_bp)

    return app
