import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios'; // ✅ Axios instance

function WorkshopDetails() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await api.get(`/workshops/${id}`); // Adjust endpoint to your backend route
        setWorkshop(res.data);
      } catch (err) {
        console.error('Error fetching workshop:', err);
        setError('Workshop not found or server error.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading workshop details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center my-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: '720px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title h3 mb-2">{workshop.name}</h2>
          <p className="text-muted mb-3">{workshop.location}</p>
          <p className="mb-4">{workshop.description}</p>

          <h5 className="fw-bold">Services Offered:</h5>
          <ul className="list-group list-group-flush mb-4">
            {workshop.services.map((service, index) => (
              <li className="list-group-item" key={index}>
                {service}
              </li>
            ))}
          </ul>

          <p className="fw-semibold text-warning">Rating: {workshop.rating} ⭐</p>
        </div>
      </div>
    </div>
  );
}

export default WorkshopDetails;
