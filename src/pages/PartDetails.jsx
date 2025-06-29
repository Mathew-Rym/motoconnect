import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

function PartDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await api.get(`/parts/${id}`);
        setPart(res.data); // Adjust if your API wraps response in another object
      } catch (err) {
        console.error('Part not found', err);
        navigate('/parts'); // redirect if not found or error
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-secondary" role="status" />
        <p className="mt-3">Loading part details...</p>
      </div>
    );
  }

  if (!part) return null; // fallback if part fails to load

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="card-title h4 text-center mb-3">{part.name}</h2>

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>Condition:</strong> {part.condition}
          </li>
          <li className="list-group-item">
            <strong>Price:</strong> <span className="text-success fw-bold">Ksh {part.price}</span>
          </li>
          <li className="list-group-item">
            <strong>Description:</strong> {part.description}
          </li>
        </ul>

        <div className="d-grid">
          <button
            onClick={() => navigate('/parts')}
            className="btn btn-primary"
          >
            Back to Parts
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartDetails;
