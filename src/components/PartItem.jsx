// src/components/PartItem.jsx
import { Link } from 'react-router-dom';

function PartItem({ part }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{part.name}</h3>
      <p className="text-gray-600">Condition: {part.condition}</p>
      <p className="text-green-600 font-medium">Ksh {part.price}</p>
      <Link
        to={`/parts/${part.id}`}
        className="inline-block mt-2 text-indigo-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}

export default PartItem;
// src/components/PartItem.jsx