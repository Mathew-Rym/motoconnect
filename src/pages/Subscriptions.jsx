import { useEffect, useState } from 'react';
import api from '../api/axios'; // ✅ Axios instance

function Subscriptions() {
  const [subscription, setSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Fetch current subscription (mock → replace with real API call)
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await api.get('/subscriptions/me'); // ⬅️ replace with your real endpoint
        setSubscription(res.data);
        setSelectedPlan(res.data.plan);
      } catch (err) {
        console.error('Error fetching subscription:', err);
      }
    };

    fetchSubscription();
  }, []);

  const handleChange = (e) => setSelectedPlan(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/subscriptions/me', { plan: selectedPlan }); // ⬅️ adjust endpoint
      alert(`Subscription updated to: ${selectedPlan}`);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update subscription. Please try again.');
    }
  };

  if (!subscription) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading subscription...</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: '720px' }}>
      <h2 className="mb-4 text-center">Your Subscription</h2>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Current Plan: {subscription.plan}</h5>
          <p className="card-subtitle mb-2 text-muted">Renews on: {subscription.renews}</p>
          <ul className="list-group list-group-flush mt-3">
            {subscription.features.map((feature, index) => (
              <li className="list-group-item" key={index}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="planSelect" className="form-label fw-bold">Switch Plan</label>
          <select
            id="planSelect"
            value={selectedPlan}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Free">Free</option>
            <option value="Standard">Standard - Ksh 500/mo</option>
            <option value="Premium">Premium - Ksh 1000/mo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Plan
        </button>
      </form>
    </div>
  );
}

export default Subscriptions;
