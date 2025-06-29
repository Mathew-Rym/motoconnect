import { useState, useEffect } from 'react';
import api from '../api/axios'; // ✅ Axios instance
import MaintenanceForm from '../components/MaintenanceForm'; 
import MaintenanceItem from '../components/MaintenanceItem';

function Maintenance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get('/maintenance');
        setRecords(res.data); // Adjust if response is nested
      } catch (err) {
        console.error('Failed to fetch maintenance:', err);
        setError('Failed to load maintenance records.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleNewRecord = async (newRecord) => {
    try {
      const res = await api.post('/maintenance', newRecord);
      setRecords((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to save new record:', err);
      alert('Failed to add maintenance entry.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Maintenance History</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Service</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <MaintenanceItem key={r.id} record={r} />
              ))}
              <MaintenanceForm onSubmit={handleNewRecord} />
              {records.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">No maintenance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Maintenance;
