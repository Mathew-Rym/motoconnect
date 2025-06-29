import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Cart from './pages/Cart.jsx';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.min.css';          // ✅ Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';     // ✅ Bootstrap JS (with Popper)
import './index.css';                                   // ✅ Your own styles (optional)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
      <AuthProvider>
        <ThemeProvider>
          <ErrorBoundary>
          <App />
          </ErrorBoundary>
        </ThemeProvider>
      </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

