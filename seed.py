from app import create_app, db
from app.models import *

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Sample Users
    user1 = User(username="rider1", email="rider1@example.com")
    user1.set_password("pass123")
    user2 = User(username="rider2", email="rider2@example.com")
    user2.set_password("pass123")

    db.session.add_all([user1, user2])
    db.session.commit()

    # Sample Bikes
    bike1 = Motorbike(
        brand="Yamaha", model="R3", year=2020, price=500000,
        mileage=15000, description="Sporty and sleek.",
        location="Nairobi", images=["yamaha.jpg"], user_id=user1.id
    )
    db.session.add(bike1)

    # Sample Part
    part1 = Part(
        name="Helmet", category="Gear", price=1500,
        condition="New", description="Certified riding helmet",
        images=["helmet.jpg"], user_id=user2.id
    )
    db.session.add(part1)

    # Sample Workshop
    workshop1 = Workshop(
        name="MotoFix Garage", location="Westlands",
        description="Expert repairs and servicing.",
        services=["engine repair", "oil change"], rating_avg=4.7
    )
    db.session.add(workshop1)

    # Sample Review
    review1 = Review(
        content="Great bike!", rating=5,
        user_id=user2.id, bike_id=bike1.id
    )
    db.session.add(review1)

    # Sample Maintenance
    record = MaintenanceRecord(
        date="2024-12-01", type="Oil Change", notes="Used synthetic oil",
        cost=2500, mileage=15000, bike_id=bike1.id, user_id=user1.id
    )
    db.session.add(record)

    # Sample Forum Post and Comment
    post = Post(title="What's the best bike for beginners?",
                content="I'm torn between Yamaha R3 and KTM 390.",
                tags=["advice", "beginner"], user_id=user1.id)
    db.session.add(post)
    db.session.flush()  # To get post.id

    comment = Comment(content="I recommend R3!", user_id=user2.id, post_id=post.id)
    db.session.add(comment)

    # Sample Subscription
    subscription = Subscription(user_id=user2.id, target_id=workshop1.id, target_type="workshop")
    db.session.add(subscription)

    db.session.commit()
    print("Sample data seeded successfully.")
