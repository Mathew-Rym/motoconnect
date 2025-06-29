// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: ' https://43a0-217-199-151-10.ngrok-free.app ', // ✅ Update if ngrok URL changes
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // Set to true if you're using cookies/sessions
});

// ✅ Request Interceptor (Optional: useful for adding auth headers later)
api.interceptors.request.use(
  (config) => {
    // Example: attach token if using authentication later
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = Bearer ${token};
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Optional: clean handling of errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `🚨 [API ERROR] ${error.response.status}: ${error.response.data?.error || error.message}`
      );
    } else {
      console.error(`🚨 [NETWORK ERROR] ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;