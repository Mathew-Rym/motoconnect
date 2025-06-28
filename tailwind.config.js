/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class', // Enable dark mode support
  purge: {
    enabled: true, // Enable purging unused styles in production
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
