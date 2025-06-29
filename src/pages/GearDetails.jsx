import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios'; // ✅ Your axios instance

function GearDetails() {
  const { id } = useParams();
  const [gear, setGear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGear = async () => {
      try {
        const response = await api.get(`/gear/${id}`); // Adjust endpoint as needed
        setGear(response.data); // or response.data.gear if your backend wraps data
      } catch (err) {
        console.error('Error fetching gear:', err);
        setError('Unable to fetch gear details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGear();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading gear details...</span>
        </div>
      </div>
    );
  }

  if (error || !gear) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">{error || 'Gear not found.'}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <h2 className="card-title h4 mb-3">{gear.name}</h2>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">Size: <strong>{gear.size}</strong></li>
          <li className="list-group-item">Price: <strong>Ksh {gear.price.toLocaleString()}</strong></li>
        </ul>
        <p className="card-text">{gear.description}</p>
      </div>
    </div>
  );
}

export default GearDetails;
