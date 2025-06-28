// src/pages/Workshops.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockWorkshops = [
  { id: 1, name: 'MotoFix Garage', location: 'Nairobi', rating: 4.8 },
  { id: 2, name: 'SpeedTune Works', location: 'Mombasa', rating: 4.5 },
  { id: 3, name: 'BikeDoctor Hub', location: 'Kisumu', rating: 4.6 },
];

function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    setTimeout(() => setWorkshops(mockWorkshops), 400);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Recommended Workshops</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <div key={workshop.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{workshop.name}</h3>
            <p className="text-gray-600">{workshop.location}</p>
            <p className="text-yellow-600 font-medium">Rating: {workshop.rating}⭐</p>
            <Link
              to={`/workshops/${workshop.id}`}
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workshops;
// This component represents a workshops page where users can view recommended workshops.
// It uses mock data to simulate workshop listings and includes a link to view details for each workshop