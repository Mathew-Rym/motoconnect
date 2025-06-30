import React from 'react';
import { useCart } from '../context/CartContext';






const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="container py-4">
      <h1 className="display-4 mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="lead">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">{item.name}</h5>
                  <p className="card-text mb-1">{item.description}</p>
                  <strong>Ksh {item.price}</strong>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="btn btn-secondary mt-3">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
