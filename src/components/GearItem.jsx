// src/components/GearItem.jsx
import { Link } from 'react-router-dom';

function GearItem({ gear }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold">{gear.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">Size: {gear.size}</p>
      <p className="text-green-600 font-medium">Ksh {gear.price}</p>
      {gear.description && (
        <p className="text-gray-600 dark:text-gray-400 mt-1">{gear.description}</p>
      )}
      {gear.id && (
        <Link
          to={`/gear/${gear.id}`}
          className="inline-block mt-2 text-indigo-600 hover:underline"
        >
          View Details
        </Link>
      )}
    </div>
  );
}

export default GearItem;
// This component displays individual gear items with their name, size, price, and an optional description.
// It also includes a link to view more details about the gear if an ID is provided.
// The component uses Tailwind CSS classes for styling, ensuring a consistent look and feel across the application.
// The dark mode styles are also included for better user experience in dark mode settings.