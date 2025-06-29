import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // import the Axios instance

function Home() {
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    api.get('/discussions') // your backend endpoint
      .then((res) => {
        setDiscussions(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch discussions:', err);
      });
  }, []);

  return (
    <div className="bg-light text-dark">
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Welcome to MotoConnect</h1>
          <p className="lead mb-4">The ultimate motorbike marketplace and community.</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-light" onClick={() => navigate('/community')}>Join the Community</button>
            <button className="btn btn-secondary" onClick={() => navigate('/bikes')}>Explore Bikes</button>
          </div>
        </div>
      </section>

      {/* Shop Gear Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="h4 fw-bold mb-3">Shop Gear</h2>
          <p className="text-muted mb-4">Browse a variety of motorcycle gear.</p>

          <div className="row">
            {/* Product 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="position-relative">
                  <img src="/images/helmet.png" className="card-img-top" alt="Premium Helmet" />
                  <span className="position-absolute top-0 start-0 bg-dark text-white px-2 py-1 small">Best Seller</span>
                </div>
                <div className="card-body">
                  <p className="text-muted small">High-quality helmet</p>
                  <h5 className="card-title">Premium Helmet</h5>
                  <p className="fw-bold">Ksh 20,000.00</p>
                  <button className="btn btn-dark w-100">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src="/images/jacket.png" className="card-img-top" alt="Riding Jacket" />
                <div className="card-body">
                  <p className="text-muted small">Durable riding jacket</p>
                  <h5 className="card-title">Riding Jacket</h5>
                  <p className="fw-bold">Ksh 14,000.00</p>
                  <button className="btn btn-dark w-100">Add to Cart</button>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src="/images/toolkit.png" className="card-img-top" alt="Motorcycle Tool Kit" />
                <div className="card-body">
                  <p className="text-muted small">Essential tool kit</p>
                  <h5 className="card-title">Motorcycle Tool Kit</h5>
                  <p className="fw-bold">Ksh 5,000.00</p>
                  <button className="btn btn-dark w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Discussions Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="h4 fw-bold mb-3">Recent Discussions</h2>
          <p className="text-muted mb-4">What's happening in our community?</p>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="bg-white p-3 border rounded">
                <div className="bg-secondary mb-2" style={{ height: '100px' }}></div>
                <p className="small">Rider sharing tips</p>
                <p className="text-muted">Check out my tips for long rides! ...</p>
                <p className="text-muted small">Rider123</p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="bg-white p-3 border rounded">
                <div className="bg-secondary mb-2" style={{ height: '100px' }}></div>
                <p className="small">Discussing modifications</p>
                <p className="text-muted">What modifications do you recommend? ...</p>
                <p className="text-muted small">BikeLover</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Profile Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="h4 fw-bold mb-3">User Profile</h2>
          <p className="text-muted mb-4">Your profile overview and settings.</p>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div className="rounded-circle bg-secondary" style={{ width: '60px', height: '60px' }}></div>
            <div>
              <p className="fw-bold mb-0">Rym Mathew</p>
              <p className="text-muted">Active Member</p>
              <button className="btn btn-dark mt-2" onClick={() => navigate('/profile')}>Edit Profile</button>
            </div>
          </div>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="h4 fw-bold mb-3">User Stats</h2>
          <p className="text-muted mb-4">Your engagement metrics.</p>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="bg-white p-3 border rounded">
                <p className="text-muted">Posts Created</p>
                <p className="fw-bold fs-5">15</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="bg-white p-3 border rounded">
                <p className="text-muted">Replies Given</p>
                <p className="fw-bold fs-5">40</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="bg-white p-3 border rounded">
                <p className="text-muted">Gear Purchased</p>
                <p className="fw-bold fs-5">3</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;