// src/components/DiscussionItem.jsx
import { Link } from 'react-router-dom';

function DiscussionItem({ discussion }) {
  return (
    <div className="border rounded p-4 shadow-sm mb-4 bg-white dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-indigo-700 mb-1">{discussion.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{discussion.snippet}</p>
      <div className="text-sm text-gray-500 flex justify-between">
        <span>By {discussion.author}</span>
        <span>{new Date(discussion.date).toLocaleDateString()}</span>
      </div>
      {discussion.id && (
        <Link
          to={`/discussions/${discussion.id}`}
          className="mt-3 inline-block text-blue-600 hover:underline"
        >
          View Discussion →
        </Link>
      )}
    </div>
  );
}

export default DiscussionItem;
