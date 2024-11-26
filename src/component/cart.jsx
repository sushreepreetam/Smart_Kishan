import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from './cartSlice';
import './cart.css';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import { EmptyCart } from './emptyCart';
import StickyFooter from './StickyFooter';
import { Link } from 'react-router-dom';


export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <div className="cart-container">
      <Navbar/>
      <div  className="cart-content container">
        {cartItems.length === 0 ? (
          <div className=' text-center'>
            <EmptyCart/>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4">Shopping Cart</h2>
            <div className="row mb-4">
              <div className="col-md-8">
                {cartItems.map(item => (
                  <div className="card mb-3" key={item.id}>
                    <div className="row g-0 align-items-center">
                      <div className="col-md-2">
                        <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                      </div>
                      <div className="col-md-10">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Sold by: Vendor Name</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <button className="btn btn-secondary" onClick={() => handleDecrementQuantity(item.id)}>-</button>
                            <span className="mx-3">{item.quantity}</span>
                            <button className="btn btn-secondary" onClick={() => handleIncrementQuantity(item.id)}>+</button>
                          </div>
                          <div>
                            <p className="card-text text-muted">Price: &#8377;{item.price}</p>
                            <p className="card-text">Total: &#8377;{item.price * item.quantity}</p>
                          </div>
                          <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Cart Total</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Total MRP</span>
                        <span>&#8377;{totalAmount}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Coupon Discount</span>
                        <span>&#8377;0</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Shipping</span>
                        <span>&#8377;40</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between fw-bold">
                        <span>Total (INR)</span>
                        <span>&#8377;{totalAmount + 40}</span>
                      </li>
                    </ul>
                    <Link to="/login" className=' text-decoration-none'><button className="btn btn-success w-100 mt-3">Process to Checkout</button></Link>
                    <button className="btn btn-success w-100 mt-3" onClick={handleBackToHome}>← Return to Shopping</button>
                  </div>
                </div>
              </div>
            </div>
            
          </>
        )}
       
      </div>
     <div className="d-none d-md-block">
      <Footer/>
     </div>
     <div className="d-block d-md-none">
      <StickyFooter/>
     </div>
    </div>
  );
}
