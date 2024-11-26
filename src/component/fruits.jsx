import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from './cartSlice';// Adjust the path if necessary
import "./ProductSection.css";

const fruits = [
  { id: 1, src: "/images/f1.webp", name: "Banana", price: 50, weight: "6Pc", discount: "28% off" },
  { id: 2, src: "/images/f2.webp", name: "Kiwi", price: 120, weight: "3pc", discount: "28% off" },
  { id: 3, src: "/images/f3.webp", name: "Coconut/Daab", price: 48, weight: "1Pc", discount: "28% off" },
  { id: 4, src: "/images/f4.webp", name: "RGrapes", price: 52, weight: "500g", discount: "28% off" },
  { id: 5, src: "/images/f5.webp", name: "Pomogranate", price: 150, weight: "250g", discount: "28% off" },
  { id: 6, src: "/images/f6.webp", name: "Coconut", price: 30, weight: "1Pc", discount: "28% off" }
];

export function Fruits() {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (fruit) => {
    dispatch(addToCart({
      id: fruit.id,
      src: fruit.src,
      name: fruit.name,
      price: fruit.price,
      quantity: 1, // initial quantity
    }));
    setQuantities({
      ...quantities,
      [fruit.id]: 1 // Set initial quantity in local state
    });
  };
  
  const handleIncrement = (fruit) => {
    dispatch(incrementQuantity(fruit.id));
    setQuantities({
      ...quantities,
      [fruit.id]: (quantities[fruit.id] || 0) + 1 // Increment local quantity
    });
  };

  const handleDecrement = (fruit) => {
    if (quantities[fruit.id] > 1) {
      dispatch(decrementQuantity(fruit.id));
      setQuantities({
        ...quantities,
        [fruit.id]: quantities[fruit.id] - 1 // Decrement local quantity
      });
    } else {
      dispatch(decrementQuantity(fruit.id)); // Remove from cart if quantity is 1
      setQuantities({
        ...quantities,
        [fruit.id]: 0 // Reset local quantity
      });
    }
  };
  return (
    <div className="container-fluid">
      <section className="my-3" id="organic">
        <h4 className="text-start">
          <strong>Organic Fruits</strong>
        </h4>
        <div className="row p-4">
          {fruits.map(fruit => (
            <div className="col-6 col-md-2 mb-3" key={fruit.id}>
              <div className="card" style={{ height: "300px" }}>
                <div className="bg-success text-white p-1 rounded-end-5" style={{ width: "60%", height: "30px" }}>
                  <b>{fruit.discount}</b>
                </div>
                <img
                  src={fruit.src}
                  alt={fruit.name}
                  className="card-img-top mt-3"
                  style={{ height: "100px", objectFit: "contain" }}
                />
                <div className="card-body mt-4">
                  <h6>{fruit.name}</h6>
                  <p>
                    &#8377;{fruit.price}
                    <span style={{ color: "GrayText", fontSize: "12px" }}></span>
                  </p>
                  <div className="d-flex justify-content-between">
                    <h6>{fruit.weight}</h6>
                    {quantities[fruit.id] > 0 ? (
                      <div className="d-flex align-items-center">
                        <button className="btn btn-danger" onClick={() => handleDecrement(fruit)}>-</button>
                        <span className="mx-2">{quantities[fruit.id]}</span>
                        <button className="btn btn-success" onClick={() => handleIncrement(fruit)}>+</button>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-success add-to-cart-btn" 
                        onClick={() => handleAddToCart(fruit)}
                        aria-label={`Add ${fruit.name} to cart`}
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
