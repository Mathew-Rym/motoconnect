// src/pages/Subscriptions.jsx
import { useEffect, useState } from 'react';

const mockSubscription = {
  plan: 'Premium',
  renews: '2025-01-01',
  features: ['Unlimited listings', 'Priority support', 'Verified badge'],
};

function Subscriptions() {
  const [subscription, setSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  useEffect(() => {
    setTimeout(() => {
      setSubscription(mockSubscription);
      setSelectedPlan(mockSubscription.plan);
    }, 300);
  }, []);

  const handleChange = (e) => setSelectedPlan(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscription updated to: ${selectedPlan} (mock)`);
  };

  if (!subscription) return <div className="p-8 text-center">Loading subscription...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Subscription</h2>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p className="font-semibold">Current Plan: {subscription.plan}</p>
        <p className="text-sm text-gray-600">Renews on: {subscription.renews}</p>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          {subscription.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Switch Plan</label>
          <select
            value={selectedPlan}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="Free">Free</option>
            <option value="Standard">Standard - Ksh 500/mo</option>
            <option value="Premium">Premium - Ksh 1000/mo</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Update Plan
        </button>
      </form>
    </div>
  );
}

export default Subscriptions;
