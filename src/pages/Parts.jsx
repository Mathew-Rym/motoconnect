import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // Your Axios instance

function Parts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await api.get('/parts'); // Assumes your backend route is /api/parts
        setParts(res.data);
      } catch (err) {
        console.error('Failed to fetch parts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Available Parts</h2>

      <div className="row">
        {loading ? (
          <div className="col-12 text-center">
            <div className="spinner-border text-secondary" role="status" />
            <p className="mt-3">Loading parts...</p>
          </div>
        ) : parts.length > 0 ? (
          parts.map((part) => (
            <div key={part.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{part.name}</h5>
                  <p className="card-text">
                    <strong>Condition:</strong> {part.condition}
                    <br />
                    <strong>Price:</strong>{' '}
                    <span className="text-success">Ksh {part.price}</span>
                  </p>
                  <Link
                    to={`/parts/${part.id}`}
                    className="btn btn-primary mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No parts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Parts;
