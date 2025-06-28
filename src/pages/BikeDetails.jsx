// src/pages/BikeDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const mockBikes = [
  { id: 1, name: 'Yamaha R3', price: 420000, description: 'Lightweight sport bike, great for beginners', year: 2020, seller: 'biker_jane' },
  { id: 2, name: 'KTM Duke 200', price: 370000, description: 'Sharp design, great torque, fun ride', year: 2019, seller: 'moto_guy' },
  { id: 3, name: 'Honda CBR500R', price: 490000, description: 'Perfect balance of power and control', year: 2021, seller: 'rider_ke' },
];

function BikeDetails() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);

  useEffect(() => {
    const found = mockBikes.find((b) => b.id === parseInt(id));
    setTimeout(() => setBike(found), 300);
  }, [id]);

  if (!bike) return <div className="p-8 text-center">Loading bike details...</div>;

  return (
<div className="bg-white dark:bg-gray-700 p-4 rounded shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4">{bike.name}</h2>
      <p className="text-gray-700 mb-2">{bike.description}</p>
      <p className="text-sm text-gray-500">Year: {bike.year}</p>
      <p className="text-green-700 font-semibold text-lg mb-2">Ksh {bike.price}</p>
      <p className="text-sm">Seller: <span className="font-medium">{bike.seller}</span></p>
    </div>
  );
}

export default BikeDetails;
// This component represents a detailed view of a specific bike.