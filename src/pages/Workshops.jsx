import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // ✅ import Axios instance

function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await api.get('/workshops'); // ⬅️ adjust the endpoint as needed
        setWorkshops(res.data);
      } catch (err) {
        console.error('Failed to fetch workshops:', err);
        setError('Unable to load workshops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">Recommended Workshops</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading workshops...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row">
          {workshops.map((workshop) => (
            <div className="col-md-4 mb-4" key={workshop.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workshop.name}</h5>
                  <p className="card-text text-muted mb-1">{workshop.location}</p>
                  <p className="card-text text-warning mb-3">Rating: {workshop.rating} ⭐</p>
                  <Link
                    to={`/workshops/${workshop.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workshops;
