// src/pages/GearDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const mockGear = [
  { id: 1, name: 'Full-Face Helmet', size: 'L', price: 5500, description: 'DOT-approved, red with clear visor.' },
  { id: 2, name: 'Riding Gloves', size: 'M', price: 1200, description: 'Padded, breathable material for long rides.' },
  { id: 3, name: 'Kevlar Jacket', size: 'XL', price: 7500, description: 'Armored and water-resistant.' },
];

function GearDetails() {
  const { id } = useParams();
  const [gear, setGear] = useState(null);

  useEffect(() => {
    const item = mockGear.find(g => g.id === parseInt(id));
    setGear(item);
  }, [id]);

  if (!gear) {
    return <div className="p-4">Gear not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-2">{gear.name}</h2>
      <p className="text-gray-500 mb-1">Size: {gear.size}</p>
      <p className="text-green-600 font-semibold mb-4">Price: Ksh {gear.price}</p>
      <p className="text-gray-700">{gear.description}</p>
    </div>
  );
}

export default GearDetails;
