// src/pages/Parts.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockParts = [
  { id: 1, name: 'Front Brake Pads', condition: 'New', price: 1800 },
  { id: 2, name: 'Sport Exhaust', condition: 'Used', price: 4500 },
  { id: 3, name: 'Chain & Sprocket Kit', condition: 'New', price: 3500 },
];

function Parts() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    setTimeout(() => setParts(mockParts), 300);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Available Parts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parts.map(part => (
          <div key={part.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{part.name}</h3>
            <p className="text-gray-600">Condition: {part.condition}</p>
            <p className="font-medium text-green-600">Ksh {part.price}</p>
            <Link
              to={`/parts/${part.id}`}
              className="mt-2 inline-block bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Parts;
    