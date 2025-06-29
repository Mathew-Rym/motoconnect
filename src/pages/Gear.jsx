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
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Available Riding Gear</h2>
      <div className="row g-4">
        {gear.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4">
            <GearItem gear={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gear;
