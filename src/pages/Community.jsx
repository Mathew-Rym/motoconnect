import { useEffect, useState } from 'react';
import DiscussionItem from '../components/DiscussionItem';
import api from '../api/axios'; // ✅ Import Axios instance

function Community() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await api.get('/discussions'); // ✅ Adjust the endpoint if needed
        // Ensure res.data is an array, handle common API response shapes
        const discussionsData = Array.isArray(res.data)
          ? res.data
          : (res.data.discussions || res.data.data || []);
        setDiscussions(discussionsData);
      } catch (err) {
        setError('Failed to load discussions.');
        console.error('Error fetching discussions:', err);
        setDiscussions([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title h4 mb-4 fw-bold">Community Discussions</h2>

          {loading && <p>Loading...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="list-group">
            {!loading && Array.isArray(discussions) ? (
              discussions.map((discussion) => (
                <DiscussionItem key={discussion.id} discussion={discussion} />
              ))
            ) : (
              !loading && !error && <p className="text-center">No discussions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;