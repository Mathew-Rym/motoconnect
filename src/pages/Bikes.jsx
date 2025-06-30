import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BikeContext } from '../context/BikeContext';

function Bikes() {
  const { bikeCart, addToCart, payForBikes } = useContext(BikeContext);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const API_URL = 'https://eee3-217-199-151-10.ngrok-free.app';

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API response data:", response.data);

        const data = response.data;

        // Normalize response to always be an array
        if (Array.isArray(data)) {
          setBikes(data);
        } else if (Array.isArray(data.bikes)) {
          setBikes(data.bikes);
        } else {
          console.error("Unexpected API format:", data);
          throw new Error("Invalid bikes data format from API.");
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching bikes:', err);
        setError(err.message || 'Failed to fetch bikes');
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handlePay = async () => {
    try {
      setPaymentSuccess(true);

      const response = await axios.post(`${API_URL}/purchase`, {
        bikes: bikeCart
      });

      console.log('Payment successful:', response.data);
      payForBikes();
      setPaymentSuccess(false);
      alert('Payment successful!');
    } catch (err) {
      console.error('Payment error:', err.response?.data || err.message);
      setPaymentSuccess(false);
      alert(`Payment failed: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading bikes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center text-danger">
        <div className="alert alert-danger">
          Error loading bikes: {error}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Available Bikes</h2>

      {bikes.length === 0 ? (
        <div className="text-center text-muted">
          <p>No bikes available at the moment. Check back later.</p>
        </div>
      ) : (
        <div className="row g-4">
          {bikes.map((bike) => (
            <div key={bike.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{bike.brand} {bike.model}</h5>
                  <div className="card-text">
                    <p><strong>Year:</strong> {bike.year}</p>
                    <p><strong>Mileage:</strong> {bike.mileage?.toLocaleString()} km</p>
                    <p><strong>Location:</strong> {bike.location}</p>
                    <p className="fw-bold text-success">Ksh {bike.price?.toLocaleString()}</p>
                  </div>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => addToCart(bike)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {bikeCart.length > 0 && (
        <div className="mt-5 p-4 border-top">
          <h4 className="mb-4">🛒 Your Cart ({bikeCart.length})</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Bike</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bikeCart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.brand} {item.model}</td>
                    <td className="fw-bold text-success">Ksh {item.price?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th className="fw-bold text-success">
                    Ksh {bikeCart.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={handlePay}
              disabled={paymentSuccess}
            >
              {paymentSuccess ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing Payment...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bikes;
