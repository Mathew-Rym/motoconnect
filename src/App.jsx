import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Remove BrowserRouter import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import './index.css';
import Cart from './pages/Cart';


// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Bikes from './pages/Bikes';
import SellBike from './pages/SellBike';
import Community from './pages/Community';
import Workshops from './pages/Workshops';
import WorkshopDetails from './pages/WorkshopDetails';
import SellPart from './pages/SellPart';
import Subscriptions from './pages/Subscriptions';
import Maintenance from './pages/Maintenance';
import ResetPassword from './pages/ResetPassword';
import BikeDetails from './pages/BikeDetails';
import Gear from './pages/Gear';
import GearDetails from './pages/GearDetails';
import Parts from './pages/Parts';

function App() {
  return (
    <>
      {/* Bootstrap navbar at top */}
      <Navbar />

      {/* Main content container */}
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/bikes/:id" element={<BikeDetails />} />
          <Route path="/sell-bike" element={<SellBike />} />
          <Route path="/community" element={<Community />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:id" element={<WorkshopDetails />} />
          <Route path="/sell-part" element={<SellPart />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/gear/:id" element={<GearDetails />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </div>

      {/* Bootstrap footer at bottom */}
      <Footer />
    </>
  );
}

export default App;
