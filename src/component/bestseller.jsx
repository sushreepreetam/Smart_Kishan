import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from './cartSlice';

import "./ProductSection.css";

// Best sellers data
const bestSellers = [
  { id: 1, src: "/images/bestseller.webp", name: "Patanjali Atta", price: 342, weight: "10kg", discount: "3% off" },
  { id: 2, src: "/images/furtune atta.webp", name: "Furtune Atta", price: 211, weight: "5kg", discount: "8% off" },
  { id: 3, src: "/images/mithila besan.webp", name: "Mithila Besan", price: 76, weight: "500g", discount: "18% off" },
  { id: 4, src: "/images/patanjali besan.webp", name: "Patanjali Besan", price: 49, weight: "500g", discount: "2% off" },
  { id: 5, src: "/images/mithila sattu.webp", name: "Mithila Sattu", price: 49, weight: "500g", discount: "18% off" },
  { id: 6, src: "/images/golden-town-cornflour.webp", name: "CornFlour", price: 60, weight: "1kg", discount: "40% off" }
];

export function Bestseller() {
  const dispatch = useDispatch(); // Correctly use useDispatch inside the component
  const [quantities, setQuantities] = useState({});
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      src: product.src,
      name: product.name,
      price: product.price,
      quantity: 1, // Initial quantity
    }));
    setQuantities({
      ...quantities,
      [product.id]: 1 // Set initial quantity in local state
    });
  };
  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product.id));
    setQuantities({
      ...quantities,
      [product.id]: (quantities[product.id] || 0) + 1 // Increment local quantity
    });
  };

  const handleDecrement = (product) => {
    if (quantities[product.id] > 1) {
      dispatch(decrementQuantity(product.id));
      setQuantities({
        ...quantities,
        [product.id]: quantities[product.id] - 1 // Decrement local quantity
      });
    } else {
      dispatch(decrementQuantity(product.id)); // Remove from cart if quantity is 1
      setQuantities({
        ...quantities,
        [product.id]: 0 // Reset local quantity
      });
    }
  };
  return (
    <div className="container-fluid">
      <section className="my-3" id="best-seller">
        <h4 className="text-start">
          <strong>Best Seller</strong>
        </h4>
        <div className="row p-4">
          {bestSellers.map(product => (
            <div className="col-6 col-md-2 mb-3" key={product.id}>
              <div className="card" style={{ height: "300px" }}>
                <div className="bg-success text-white p-1 rounded-end-5" style={{ width: "60%", height: "30px" }}>
                  <b>{product.discount}</b>
                </div>
                <img
                  src={product.src}
                  alt={product.name}
                  className="card-img-top mt-3"
                  style={{ height: "100px", objectFit: "contain" }}
                />
                <div className="card-body mt-4">
                  <h6>{product.name}</h6>
                  <p>
                    &#8377;{product.price}
                    <span style={{ color: "GrayText", fontSize: "12px" }}></span>
                  </p>
                  <div className="d-flex justify-content-between">
                    <h6>{product.weight}</h6>
                    {quantities[product.id] > 0 ? (
                      <div className="d-flex align-items-center">
                        <button className="btn btn-danger" onClick={() => handleDecrement(product)}>-</button>
                        <span className="mx-2">{quantities[product.id]}</span>
                        <button className="btn btn-success" onClick={() => handleIncrement(product)}>+</button>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-success add-to-cart-btn" 
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <i className="bi bi-plus-square"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
