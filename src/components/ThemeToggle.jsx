// src/components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeToggle() {
const { darkMode, toggleTheme } = useContext(ThemeContext);
return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border hover:bg-gray-200 dark:hover:bg-gray-800"
    >
{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

export default ThemeToggle;

