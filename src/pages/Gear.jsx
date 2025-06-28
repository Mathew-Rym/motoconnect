// src/pages/Gear.jsx
import { useEffect, useState } from 'react';
import GearItem from '../components/GearItem';

const mockGear = [
  { id: 1, name: 'Full-Face Helmet', size: 'L', price: 5500, description: 'DOT-approved, red with clear visor.' },
  { id: 2, name: 'Riding Gloves', size: 'M', price: 1200, description: 'Padded, breathable material for long rides.' },
  { id: 3, name: 'Kevlar Jacket', size: 'XL', price: 7500, description: 'Armored and water-resistant.' },
];

function Gear() {
  const [gear, setGear] = useState([]);

  useEffect(() => {
    setTimeout(() => setGear(mockGear), 300); // simulate API delay
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Available Riding Gear</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {gear.map((item) => (
          <GearItem key={item.id} gear={item} />
        ))}
      </div>
    </div>
  );
}

export default Gear;
