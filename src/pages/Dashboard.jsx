// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
<div className="bg-white dark:bg-gray-700 p-4 rounded shadow transition-colors duration-300">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
<div className="bg-white dark:bg-gray-700 p-4 rounded shadow transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}</h1>
      <p className="text-gray-700 mb-4">
        This is your dashboard. From here, you can manage your listings, track maintenance, and connect with fellow riders.
      </p>
      {/* Add dashboard widgets or links here */}
    </div>
  );
}

export default Dashboard;
// This code defines a Dashboard component that displays a welcome message and basic user information.