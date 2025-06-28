// src/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // update if using Render

// Helper to get the JWT token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Default headers including JWT token if available
function getHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Generic API helpers
export async function apiGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: getHeaders(),
  });
  return res.json();
}

export async function apiPost(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiPatch(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return res.json();
}
