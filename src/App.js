import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bikes from './pages/Bikes';
import BikeDetails from './pages/BikeDetails';
import SellBike from './pages/SellBike';
import Community from './pages/Community';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/bikes" element={<PrivateRoute><Bikes /></PrivateRoute>} />
              <Route path="/bike/:id" element={<PrivateRoute><BikeDetails /></PrivateRoute>} />
              <Route path="/sell" element={<PrivateRoute><SellBike /></PrivateRoute>} />
              <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;