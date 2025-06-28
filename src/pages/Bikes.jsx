// src/pages/Bikes.jsx
import React, { useEffect, useState } from 'react';

const mockBikes = [
  { id: 1, name: 'Yamaha R1', year: 2021, price: 12000 },
  { id: 2, name: 'KTM Duke 390', year: 2022, price: 5500 },
  { id: 3, name: 'Honda CBR 500R', year: 2020, price: 6300 },
];

function Bikes() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    setTimeout(() => {
      setBikes(mockBikes);
    }, 500);
  }, []);

  return (
<div className="bg-white dark:bg-gray-700 p-4 rounded shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Available Bikes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bikes.map(bike => (
          <div key={bike.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{bike.name}</h3>
            <p className="text-gray-600">Year: {bike.year}</p>
            <p className="text-green-600 font-bold">${bike.price}</p>
<button className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors duration-300">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bikes;
// This Bikes component fetches a list of bikes and displays them in a grid format.
// Each bike shows its name, year, price, and a button to view more details.
// The mockBikes array simulates the data that would typically come from a backend API.