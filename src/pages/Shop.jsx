// src/pages/Shop.jsx
import { useEffect, useState } from 'react';
import BikeItem from '../components/BikeItem';
import PartItem from '../components/PartItem';

const mockBikes = [
  { id: 1, name: 'Yamaha R3', price: 420000, description: 'Lightweight sport bike' },
  { id: 2, name: 'KTM Duke 200', price: 370000, description: 'Fun and agile ride' },
];

const mockParts = [
  { id: 1, name: 'Front Brake Pads', condition: 'New', price: 1800 },
  { id: 2, name: 'Sport Exhaust', condition: 'Used', price: 4500 },
];

function Shop() {
  const [bikes, setBikes] = useState([]);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setBikes(mockBikes);
      setParts(mockParts);
    }, 300);
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-4">Shop Bikes & Parts</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Motorbikes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <BikeItem key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Parts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {parts.map((part) => (
            <PartItem key={part.id} part={part} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Shop;
// This component represents a shop page where users can view available bikes and parts for sale.