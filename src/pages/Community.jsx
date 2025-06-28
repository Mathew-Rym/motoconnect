// src/pages/Community.jsx
import { useEffect, useState } from 'react';
import DiscussionItem from '../components/DiscussionItem';

const mockDiscussions = [
  {
    id: 1,
    title: 'Best Maintenance Practices for Daily Riders',
    snippet: 'What routine checks do you recommend for someone who rides every day?',
    author: 'RiderKen',
    date: '2025-06-20',
  },
  {
    id: 2,
    title: 'Helmet Recommendations?',
    snippet: 'Looking for a good full-face helmet for long rides — any favorites?',
    author: 'MotoQueen254',
    date: '2025-06-22',
  },
  {
    id: 3,
    title: 'Is Chain Cleaning Every 500km Overkill?',
    snippet: 'Curious how often y’all clean your chains and what lube you use.',
    author: 'BodaBodaGuru',
    date: '2025-06-24',
  },
];

function Community() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    setTimeout(() => setDiscussions(mockDiscussions), 300); // simulate API
  }, []);

  return (
<div className="bg-white dark:bg-gray-700 p-4 rounded shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Community Discussions</h2>
      {discussions.map(discussion => (
        <DiscussionItem key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
}

export default Community;
