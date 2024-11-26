import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from './cartSlice'; // Import increment and decrement actions
import "./ProductSection.css";


export function Vegitable() {
    const dispatch = useDispatch();
    
    
    const vegetables = [
        { id: 1, src: "/images/m1.webp", name: "Red Capsicum", price: 50, weight: "250g" },
        { id: 2, src: "/images/m2.webp", name: "Red Lettuce", price: 99, weight: "250g" },
        { id: 3, src: "/images/m3.webp", name: "Raw Papaya", price: 55, weight: "1Kg" },
        { id: 4, src: "/images/m4.webp", name: "Brocoli", price: 61, weight: "1Pc" },
        { id: 5, src: "/images/m5.webp", name: "Baby Corn", price: 96, weight: "500g" },
        { id: 6, src: "/images/m6.webp", name: "Mushrooms", price: 55, weight: "250g" }
    ];

    // Local state to manage quantities for each item
    const [quantities, setQuantities] = useState({});

    const handleAddToCart = (veg) => {
        dispatch(addToCart({
            id: veg.id,
            src: veg.src,
            name: veg.name,
            price: veg.price,
            quantity: 1, // initial quantity
        }));
        setQuantities({
            ...quantities,
            [veg.id]: 1 // Set initial quantity in local state
        });
    };

    const handleIncrement = (veg) => {
        dispatch(incrementQuantity(veg.id));
        setQuantities({
            ...quantities,
            [veg.id]: (quantities[veg.id] || 0) + 1 // Increment local quantity
        });
    };

    const handleDecrement = (veg) => {
        if (quantities[veg.id] > 1) {
            dispatch(decrementQuantity(veg.id));
            setQuantities({
                ...quantities,
                [veg.id]: quantities[veg.id] - 1 // Decrement local quantity
            });
        } else {
            dispatch(decrementQuantity(veg.id)); // Remove from cart if quantity is 1
            setQuantities({
                ...quantities,
                [veg.id]: 0 // Reset local quantity
            });
        }
    };

    return (
        <div className="container-fluid p-0">
            <section className="my-3" id="organic">
                <h4 className="text-start">
                    <strong>Organic Vegetables</strong>
                </h4>
                <div className="row p-4">
                    {vegetables.map((veg) => (
                        <div className="col-6 col-md-2 mb-3" key={veg.id}>
                            <div className="card" style={{ height: "300px" }}>
                                <div className="bg-success text-white p-1 rounded-end-5" style={{ width: "60%", height: "30px" }}>
                                    <b>28% off</b>
                                </div>

                                <img
                                    src={veg.src}
                                    alt={veg.name}
                                    className="card-img-top mt-3"
                                    style={{ height: "100px", objectFit: "contain" }}
                                />
                                <div className="card-body mt-4" style={{ flex: "1" }}>
                                    <h6>{veg.name}</h6>
                                    <p>
                                        &#8377;{veg.price}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <h6>{veg.weight}</h6>
                                        {quantities[veg.id] > 0 ? (
                                            <div className="d-flex align-items-center"id="plusbtn">
                                                <button className="btn btn-danger" onClick={() => handleDecrement(veg)}>-</button>
                                                <span className="mx-2">{quantities[veg.id]}</span>
                                                <button className="btn btn-success" onClick={() => handleIncrement(veg)}>+</button>
                                            </div>
                                        ) : (
                                          <button 
                                          className="btn btn-success add-to-cart-btn" 
                                          onClick={() => handleAddToCart(veg)}
                                          aria-label={`Add ${veg.name} to cart`}
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
