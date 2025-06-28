// src/components/BikeItem.jsx
import { Link } from 'react-router-dom';

function BikeItem({ bike }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{bike.name}</h3>
      <p className="text-gray-600">{bike.description || 'No description'}</p>
      <p className="text-green-600 font-medium">Ksh {bike.price}</p>
      <Link
        to={`/bikes/${bike.id}`}
        className="inline-block mt-2 text-indigo-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}

export default BikeItem;
