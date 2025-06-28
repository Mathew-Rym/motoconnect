// src/components/MaintenanceItem.jsx
function MaintenanceItem({ record }) {
  return (
    <div className="border p-4 rounded shadow-sm mb-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{record.title}</h3>
        <span className="text-sm text-gray-500">
          {new Date(record.date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{record.notes}</p>
      <p className="text-sm text-gray-600 mt-2">Cost: Ksh {record.cost}</p>
    </div>
  );
}

export default MaintenanceItem;
