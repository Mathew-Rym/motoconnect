
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
 

        {/* Hero Section */}
      <section className="bg-[#4B4B4B] text-white py-24">
        <div className="max-w-10xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MotoConnect</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            The ultimate motorbike marketplace and community.
          </p>
          <div className="flex flex-row justify-center items-center gap-6">
            <button
              className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-800 transition"
              onClick={() => navigate('/community')}
            >
              Join the Community
            </button>
            <button
              className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition"
              onClick={() => navigate('/bikes')}
            >
              Explore Bikes
            </button>
            <button
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
              onClick={() => navigate('/sell')}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Shop Gear Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Shop Gear</h2>
          <p className="text-gray-600 mb-8">Browse a variety of motorcycle gear.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-4 rounded">
              <div className="w-full h-48 bg-gray-300 mb-2"></div>
              <p className="text-sm">Best Seller</p>
              <p className="font-bold">Premium Helmet</p>
              <p className="text-gray-600">Ksh 20,000.00</p>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <div className="w-full h-48 bg-gray-300 mb-2"></div>
              <p className="text-sm">Riding Jacket</p>
              <p className="font-bold">Durable Riding Jacket</p>
              <p className="text-gray-600">Ksh 14,000.00</p>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <div className="w-full h-48 bg-gray-300 mb-2"></div>
              <p className="text-sm">Motorcycle Tool Kit</p>
              <p className="font-bold">Shop Tool Kit</p>
              <p className="text-gray-600">Ksh 5,000.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Discussions Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Recent Discussions</h2>
          <p className="text-gray-600 mb-8">What's happening in our community?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-200 p-4 rounded">
              <div className="w-full h-32 bg-gray-300 mb-2"></div>
              <p className="text-sm">Rider sharing tips</p>
              <p className="text-gray-600">Check out my tips for long rides! ...</p>
              <p className="text-gray-500">Rider123</p>
            </div>
            <div className="bg-gray-200 p-4 rounded">
              <div className="w-full h-32 bg-gray-300 mb-2"></div>
              <p className="text-sm">Discussing modifications</p>
              <p className="text-gray-600">What modifications do you recommend? ...</p>
              <p className="text-gray-500">BikeLover</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Profile Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <p className="text-gray-600 mb-8">Your profile overview and settings.</p>
          <div className="flex justify-center items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-bold">Rym Mathew</p>
              <p className="text-gray-600">Active Member</p>
              <button
                className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-gray-900 transition"
                onClick={() => navigate('/profile')}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">User Stats</h2>
          <p className="text-gray-600 mb-8">Your engagement metrics.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded">
              <p className="text-gray-600">Posts Created</p>
              <p className="font-bold">15</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-600">Replies Given</p>
              <p className="font-bold">40</p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-600">Gear Purchased</p>
              <p className="font-bold">3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
}

export default Home;
