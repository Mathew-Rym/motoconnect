import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // ✅ import the configured Axios instance

function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await api.get('/bikes'); // ✅ Axios call
        // Ensure response.data is an array, handle common API response shapes
        const bikesData = Array.isArray(response.data) 
          ? response.data 
          : (response.data.bikes || response.data.data || []);
        setBikes(bikesData);
      } catch (error) {
        console.error('Error fetching bikes:', error);
        setError('Failed to load bikes. Showing sample data.');

        // Fallback mock data
        setBikes([
          {
            id: 1,
            brand: 'Yamaha',
            model: 'R1',
            year: 2021,
            price: 12000,
            mileage: 5000,
            location: 'Nairobi',
          },
          {
            id: 2,
            brand: 'KTM',
            model: 'Duke 390',
            year: 2022,
            price: 5500,
            mileage: 3000,
            location: 'Mombasa',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Available Bikes</h2>

      {loading && <p className="text-center">Loading bikes...</p>}
      {error && <div className="alert alert-warning text-center">{error}</div>}

      <div className="row g-4">
        {Array.isArray(bikes) ? (
          bikes.map((bike) => (
            <div key={bike.id} className="col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{bike.brand} {bike.model}</h5>
                    <p className="card-text mb-1">Year: {bike.year}</p>
                    <p className="card-text mb-1">Mileage: {bike.mileage.toLocaleString()} km</p>
                    <p className="card-text mb-1">Location: {bike.location}</p>
                    <p className="text-success fw-bold mt-2">Ksh {bike.price.toLocaleString()}</p>
                  </div>
                  <a href={`/bikes/${bike.id}`} className="btn btn-primary mt-3 w-100">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bikes available.</p>
        )}
      </div>
    </div>
  );
}

export default Bikes;