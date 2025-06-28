// src/pages/Store.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockBikes = [
  { id: 1, name: 'Yamaha R3', price: 420000, type: 'Bike' },
  { id: 2, name: 'KTM Duke 200', price: 370000, type: 'Bike' },
];

const mockParts = [
  { id: 1, name: 'Front Brake Pads', price: 1800, type: 'Part' },
  { id: 2, name: 'Sport Exhaust', price: 4500, type: 'Part' },
];

function Store() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const combined = [...mockBikes, ...mockParts];
    setTimeout(() => setItems(combined), 300);
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">MotoConnect Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={`${item.type}-${item.id}`} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.type}</p>
            <p className="font-medium text-green-600">Ksh {item.price}</p>
            {item.type === 'Bike' ? (
              <Link to={`/bikes/${item.id}`} className="inline-block mt-2 text-indigo-600 hover:underline">
                View Bike
              </Link>
            ) : (
              <Link to={`/parts/${item.id}`} className="inline-block mt-2 text-indigo-600 hover:underline">
                View Part
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
