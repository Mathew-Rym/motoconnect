// src/pages/WorkshopDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mockWorkshopDetails = {
  1: {
    name: 'MotoFix Garage',
    location: 'Nairobi',
    description: 'Specializes in performance tuning and diagnostics.',
    services: ['Oil Change', 'Chain Adjustment', 'Engine Tune-Up'],
    rating: 4.8,
  },
  2: {
    name: 'SpeedTune Works',
    location: 'Mombasa',
    description: 'Known for fast service and professional mechanics.',
    services: ['Brake Repair', 'Tire Replacement', 'General Service'],
    rating: 4.5,
  },
  3: {
    name: 'BikeDoctor Hub',
    location: 'Kisumu',
    description: 'Expert maintenance for all bike brands.',
    services: ['Inspection', 'Electrical Work', 'Custom Paint'],
    rating: 4.6,
  },
};

function WorkshopDetails() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    const data = mockWorkshopDetails[id];
    if (data) setWorkshop(data);
  }, [id]);

  if (!workshop) {
    return <p className="text-center mt-20">Loading workshop details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold mb-2">{workshop.name}</h2>
      <p className="text-gray-600 mb-4">{workshop.location}</p>
      <p className="mb-4">{workshop.description}</p>
      <p className="font-semibold mb-2">Services Offered:</p>
      <ul className="list-disc list-inside mb-4">
        {workshop.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <p className="text-yellow-600 font-medium">Rating: {workshop.rating}⭐</p>
    </div>
  );
}

export default WorkshopDetails;
// This component fetches and displays detailed information about a specific workshop based on the ID from the URL parameters.
// It uses mock data for demonstration purposes, which can be replaced with actual API calls in a