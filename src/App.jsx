// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { AuthProvider } from './context/AuthContext';
//import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; // Import your main CSS file
import PrivateRoute from './components/PrivateRoute';

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
import Store from './pages/Store';
import Subscriptions from './pages/Subscriptions';
import Maintenance from './pages/Maintenance';
import ResetPassword from './pages/ResetPassword';  
import BikeDetails from './pages/BikeDetails';
import Shop from './pages/Shop';
import Gear from './pages/Gear';
import GearDetails from './pages/GearDetails';
import Parts from './pages/Parts';


function App() {
  return (
    
        
<div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/parts" element={<PrivateRoute><Parts /></PrivateRoute>} />
                <Route path="/gear/:id" element={<GearDetails />} />
                <Route path="/gear" element={<PrivateRoute><Gear /></PrivateRoute>} />
                <Route path="/shop/:id" element={<Shop />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/bikes/:id" element={<BikeDetails />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/maintenance" element={<PrivateRoute><Maintenance /></PrivateRoute>} />
                <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
                <Route path="/sell-part" element={<PrivateRoute><SellPart /></PrivateRoute>} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/bikes" element={<Bikes />} />
                <Route path="/sell-bike" element={<PrivateRoute><SellBike /></PrivateRoute>} />
                <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/store" element={<Store />} />
                <Route path="/workshops/:id" element={<WorkshopDetails />} />
              </Routes>
            </main>

            <Footer />
          </div>
        
  );
}

export default App;
// This code sets up the main application structure for a React app using React Router for navigation.
// It includes a Navbar, Footer, and various routes for different pages, with private routes for