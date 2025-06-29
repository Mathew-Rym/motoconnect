import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Optional if fetching fresh user data

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user); // fallback to context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    // Optional: Fetch latest profile info from backend
    // const fetchProfile = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await api.get('/profile'); // Adjust to your endpoint
    //     setProfile(res.data);
    //   } catch (err) {
    //     console.error('Profile fetch error:', err);
    //     setError('Failed to load profile.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchProfile();
  }, [user, navigate]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Your Profile</h2>

      <div className="card shadow mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <p className="card-text mb-3">
            <strong>Username:</strong> {profile.username}
          </p>
          <p className="card-text mb-3">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="card-text">
            <strong>Member Since:</strong>{' '}
            {profile.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : 'June 2025'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
