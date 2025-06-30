# # from flask import Flask
# # from flask_sqlalchemy import SQLAlchemy
# # from flask_migrate import Migrate
# # from flask_cors import CORS
# # from config import Config
# # from dotenv import load_dotenv


# # load_dotenv()

# # db = SQLAlchemy()
# # migrate = Migrate()

# # def create_app():
# #     app = Flask(__name__)  
# #     app.config.from_object(Config)

     
# #     db.init_app(app)
# #     migrate.init_app(app, db)

# #     CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://*.ngrok-free.app"]}}, supports_credentials=True)

# #     # CORS(app, resources={r"/*": {"origins": [
# #     #     "http://localhost:5173",
# #     #     "http://localhost:5174"
# #     # ]}}, supports_credentials=True)

# #     from app.routes.auth import auth_bp
# #     from app.routes.bikes import bikes_bp
# #     from app.routes.parts import parts_bp
# #     from app.routes.reviews import reviews_bp
# #     from app.routes.maintenance import maintenance_bp
# #     from app.routes.workshop import workshops_bp
# #     from app.routes.community import community_bp
# #     from app.routes.subscriptions import subscriptions_bp
# #     from app.routes.user import user_bp

# #     app.register_blueprint(auth_bp)
# #     app.register_blueprint(bikes_bp)
# #     app.register_blueprint(parts_bp)
# #     app.register_blueprint(reviews_bp)
# #     app.register_blueprint(maintenance_bp)
# #     app.register_blueprint(workshops_bp)
# #     app.register_blueprint(community_bp)
# #     app.register_blueprint(subscriptions_bp)
# #     app.register_blueprint(user_bp)

# #     return app





# from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_cors import CORS
# from config import Config
# from dotenv import load_dotenv

# load_dotenv()

# db = SQLAlchemy()
# migrate = Migrate()

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     db.init_app(app)
#     migrate.init_app(app, db)

#     # ✅ CORS setup — only set once, no after_request needed
#     CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

#     # ✅ Sample route
#     @app.route('/api/hello')
#     def hello():
#         return jsonify({"message": "Hello from Flask"})

#     # ✅ Import & register blueprints (clean)
#     from app.routes.auth import auth_bp
#     from app.routes.bikes import bikes_bp
#     from app.routes.parts import parts_bp
#     from app.routes.reviews import reviews_bp
#     from app.routes.maintenance import maintenance_bp
#     from app.routes.workshop import workshops_bp
#     from app.routes.community import community_bp
#     from app.routes.subscriptions import subscriptions_bp
#     from app.routes.user import user_bp

#     app.register_blueprint(auth_bp, url_prefix='/api')
#     app.register_blueprint(bikes_bp, url_prefix='/api')
#     app.register_blueprint(parts_bp, url_prefix='/api')
#     app.register_blueprint(reviews_bp, url_prefix='/api')
#     app.register_blueprint(maintenance_bp, url_prefix='/api')
#     app.register_blueprint(workshops_bp, url_prefix='/api')
#     app.register_blueprint(community_bp, url_prefix='/api')  # ✅ Community
#     app.register_blueprint(subscriptions_bp, url_prefix='/api')
#     app.register_blueprint(user_bp, url_prefix='/api')

#     return app







from flask import Flask, jsonify
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

    # ✅ CORS configuration for frontend at localhost:5173
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    @app.route('/')
    def index():
     return jsonify({"message": "Welcome to MotoConnect API!"})

    # ✅ Import and register blueprints with '/api' prefix
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

    # ✅ Optional: health check route
    @app.route('/api/health')
    def health_check():
        return jsonify({"status": "OK"}), 200

    return app
