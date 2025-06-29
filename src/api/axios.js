// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Optional: if your backend uses cookies for auth
  // withCredentials: true,
});

export default api;
