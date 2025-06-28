

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Tailwind styles
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter>
          <App />
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// This code sets up the main entry point for a React application, wrapping the App component with BrowserRouter and AuthProvider for routing and authentication context management.
// It uses React 18's createRoot API for rendering, ensuring the app is ready for