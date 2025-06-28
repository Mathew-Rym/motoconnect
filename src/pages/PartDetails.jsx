// src/pages/PartDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const mockParts = [
  { id: 1, name: 'Front Brake Pads', condition: 'New', price: 1800, description: 'High-performance front brake pads for better stopping power.' },
  { id: 2, name: 'Sport Exhaust', condition: 'Used', price: 4500, description: 'Boosts sound and performance, previously used for 6 months.' },
  { id: 3, name: 'Chain & Sprocket Kit', condition: 'New', price: 3500, description: 'Complete kit for long-distance reliability.' },
];

function PartDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState(null);

  useEffect(() => {
    const found = mockParts.find(p => p.id === parseInt(id));
    if (found) setPart(found);
    else navigate('/parts');
  }, [id, navigate]);

  if (!part) return <div className="p-8 text-center">Loading part details...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-4">{part.name}</h2>
      <p className="text-gray-600 mb-2">Condition: <span className="font-semibold">{part.condition}</span></p>
      <p className="text-green-700 font-semibold text-lg mb-4">Ksh {part.price}</p>
      <p className="mb-6">{part.description}</p>
      <button
        onClick={() => navigate('/parts')}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Back to Parts
      </button>
    </div>
  );
}

export default PartDetails;
