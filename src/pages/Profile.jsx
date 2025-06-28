// src/pages/Profile.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="text-center mt-10 text-red-500">You must be logged in to view your profile.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white shadow p-4 rounded">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> {user.created_at || 'June 2025'}</p>
      </div>
    </div>
  );
}

export default Profile;
// This code defines a Profile component that displays the user's profile information.