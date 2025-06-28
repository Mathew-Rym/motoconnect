import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <nav className={`bg-gray-100 dark:bg-gray-800 shadow-md p-4 border-b ${darkMode ? 'text-gray-300' : 'text-black'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MotoConnect
        </Link>

        {/* Nav links and search */}
        <div className="flex items-center space-x-6 text-lg font-medium dark:text-gray-200 ">
          <div className="flex space-x-6 bg-red-100 p-2 rounded-lg dark:bg-gray-700">
            <Link to="/dashboard" className="hover:text-gray-800 dark:hover:text-white">Dashboard</Link>
            <Link to="/bikes" className="hover:text-gray-800 dark:hover:text-white">Bikes</Link>
            <Link to="/sell" className="hover:text-gray-800 dark:hover:text-white">Sell</Link>
            <Link to="/community" className="hover:text-gray-800 dark:hover:text-white">Community</Link>
            <Link to="/profile" className="hover:text-gray-800 dark:hover:text-white">Profile</Link>
          </div>
          {user ? (
            <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
          <input
            type="text"
            placeholder="Search in site"
            className="w-64 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
          />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;