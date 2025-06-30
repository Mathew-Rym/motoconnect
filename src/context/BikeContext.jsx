import React, { createContext, useState, useContext } from 'react';

// Create the context
const BikeContext = createContext();

// Provider component
export const BikeProvider = ({ children }) => {
  const [bikes, setBikes] = useState([]);
  const [bikeCart, setBikeCart] = useState([]);
  const [bikeHistory, setBikeHistory] = useState([]);

  // Add to cart
  const addToCart = (bike) => {
    setBikeCart((prev) => [...prev, bike]);
  };

  // Pay for bikes
  const payForBikes = () => {
    setBikeHistory((prev) => [...prev, ...bikeCart]);
    setBikeCart([]);
  };

  // Remove bike from history
  const removeBike = (bikeId) => {
    setBikeHistory((prev) => prev.filter(bike => bike.id !== bikeId));
  };

  return (
    <BikeContext.Provider value={{
      bikes,
      setBikes,
      bikeCart,
      setBikeCart,
      bikeHistory,
      setBikeHistory,
      addToCart,
      payForBikes,
      removeBike // Add the remove function to the context
    }}>
      {children}
    </BikeContext.Provider>
  );
};

// Custom hook to use the context
export const useBike = () => useContext(BikeContext);
export { BikeContext };