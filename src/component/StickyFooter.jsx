import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import { Link } from 'react-router-dom'; // Import Link for navigation
import "./ProductSection.css";

const StickyFooter = () => {
    const [isMobile, setIsMobile] = useState(false);
    const cartQuantity = useSelector(state => state.cart.totalQuantity); // Get cart quantity from Redux store

    // Detect if the screen is mobile-sized
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust width for mobile view
    };

    useEffect(() => {
        checkScreenSize(); // Check on initial render
        window.addEventListener('resize', checkScreenSize); // Check on window resize
        return () => window.removeEventListener('resize', checkScreenSize); // Cleanup event listener
    }, []);

    if (!isMobile) return null; // Don't render on desktop view

    return (
        <footer className="footer fixed-bottom bg-light d-block d-md-none shadow-lg py-2">
            <div className="container-fluid d-flex justify-content-around text-center align-items-center">
                <Link to="/" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                    <i className="bi bi-house-door-fill fs-4"></i><br />Home
                </Link>
                <Link to="/category" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                    <i className="bi bi-grid-fill fs-4"></i><br />Category
                </Link>
                <Link to="/" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                    <i className="bi bi-arrow-repeat fs-4"></i><br />Order Again
                </Link>
                <Link to="/cart" className="text-decoration-none text-dark d-flex flex-column align-items-center position-relative">
                    <i className="bi bi-cart fs-4"></i>
                    {cartQuantity > 0 && (
                        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle">
                            {cartQuantity}
                        </span>
                    )}
                    <br />Cart
                </Link>
                <Link to="/dashboard" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                    <i className="bi bi-person-circle fs-4"></i><br />Account
                </Link>
            </div>
        </footer>
    );
};

export default StickyFooter;
