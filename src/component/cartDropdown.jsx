// CartDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './cartDropdown.css';

export function CartDropdown() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="dropdown-item">
                  <img src={item.image} alt={item.name} className="dropdown-item-image" />
                  <div className="dropdown-item-details">
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              </li>        
            ))}        
          </ul> 
        )}
        <div className="dropdown-footer">
          <Link to="/cart" className="btn btn-success w-100">
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
