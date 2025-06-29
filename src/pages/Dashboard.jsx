import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <aside className="col-md-3 col-lg-2 bg-light d-none d-md-block p-4 border-end">
          <h2 className="h4 fw-bold mb-4">Dashboard</h2>
          <ul className="nav flex-column">
            <SidebarLink icon={<FiBox />} label="My Gear" to="/gear" />
            <SidebarLink icon={<FiShoppingCart />} label="Orders" to="/orders" />
            <SidebarLink icon={<FiUsers />} label="Community" to="/community" />
            <SidebarLink icon={<FiSettings />} label="Settings" to="/profile" />
            <li className="nav-item mt-4">
              <button
                onClick={handleLogout}
                className="btn btn-link nav-link text-danger d-flex align-items-center gap-2"
              >
                <FiLogOut className="fs-5" />
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Area */}
        <main className="col-md-9 col-lg-10 p-4">
          <header className="mb-4">
            <h1 className="h3">Welcome, {user?.username || 'Guest'}</h1>
            <p className="text-muted">
              Manage your motorcycle listings and activity from your dashboard.
            </p>
          </header>

          {/* Dashboard Cards */}
          <div className="row g-4 mb-4">
            <DashboardCard title="My Gear" value="5 Items" icon={<FiBox />} />
            <DashboardCard title="Orders" value="12 Orders" icon={<FiShoppingCart />} />
            <DashboardCard title="Followers" value="300+" icon={<FiUsers />} />
            <DashboardCard title="Revenue" value="Ksh 150,000" icon={<FiSettings />} />
          </div>

          {/* Recent Activity Placeholder */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Recent Activity</h5>
              <div className="text-muted text-center py-3">
                Coming soon: Charts, Notifications, Tables...
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Sidebar Link Component
function SidebarLink({ icon, label, to }) {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-link d-flex align-items-center gap-2 text-dark">
        <span className="fs-5">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

// ✅ Dashboard Card Component
function DashboardCard({ title, value, icon }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex align-items-center">
          <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle me-3 fs-5">
            {icon}
          </div>
          <div>
            <div className="text-muted small">{title}</div>
            <div className="fw-bold">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
