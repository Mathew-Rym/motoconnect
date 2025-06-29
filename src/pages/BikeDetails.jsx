import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios'; // ✅ Import your Axios instance

function BikeDetails() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const res = await api.get(`/bikes/${id}`);
        setBike(res.data); // Ensure your backend returns a single bike object
      } catch (err) {
        console.error('Error fetching bike:', err);
        setError('Could not load bike details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading bike details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container text-center py-5">
        <p className="text-muted">Bike not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title h4">{bike.name}</h2>
          <p className="card-text mb-2">{bike.description}</p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">Year: <strong>{bike.year}</strong></li>
            <li className="list-group-item">Seller: <strong>{bike.seller}</strong></li>
          </ul>
          <p className="text-success fw-bold fs-5">Ksh {bike.price?.toLocaleString()}</p>
          <button className="btn btn-primary mt-3">Contact Seller</button>
        </div>
      </div>
    </div>
  );
}

export default BikeDetails;
