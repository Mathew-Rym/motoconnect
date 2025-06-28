// src/pages/Maintenance.jsx
import { useState, useEffect } from 'react';
import MaintenanceForm from '../components/MaintenanceForm'; 
import MaintenanceItem from '../components/MaintenanceItem';
// This code defines a Maintenance component that displays a list of maintenance records
// and allows users to add new records through a form.
const mockMaintenanceRecords = [
  { id: 1, date: '2024-04-10', service: 'Oil Change', notes: 'Used synthetic oil' },
  { id: 2, date: '2024-05-12', service: 'Chain Adjustment', notes: 'Adjusted tension and cleaned' },
  { id: 3, date: '2024-06-01', service: 'Tire Replacement', notes: 'Rear tire replaced' },
];

function Maintenance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setTimeout(() => setRecords(mockMaintenanceRecords), 500);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Maintenance History</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Service</th>
            <th className="py-2 px-4 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
           {records.map((r) => (
  <MaintenanceItem key={r.id} record={r} />
))}
          <MaintenanceForm onSubmit={(newRecord) => setRecords([...records, newRecord])} />
{records.length === 0 ? (
  <tr>
    <td className="py-2 px-4" colSpan={3}>No maintenance records found.</td>
  </tr>
) : (
  records.map(record => (
    <tr key={record.id} className="border-t">
      <td className="py-2 px-4">{record.date}</td>
      <td className="py-2 px-4">{record.service}</td>
      <td className="py-2 px-4">{record.notes}</td>
    </tr>
  ))
)}
        </tbody>
      </table>
    </div>
  );
}

export default Maintenance;
