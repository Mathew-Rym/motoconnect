// src/components/WorkshopItem.jsx
import { Link } from 'react-router-dom';

function WorkshopItem({ workshop }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{workshop.name}</h3>
      <p className="text-gray-600">{workshop.location}</p>
      <p className="text-sm text-gray-500">Rating: {workshop.rating} ⭐</p>
      <Link
        to={`/workshops/${workshop.id}`}
        className="inline-block mt-2 text-indigo-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}

export default WorkshopItem;
