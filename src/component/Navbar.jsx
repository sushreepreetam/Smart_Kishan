import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './ProductSection.css';
import SearchModal from './SearchModal';
import { CartDropdown } from "./cartDropdown";

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const products = useSelector((state) => state.products);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const placeholders = [
    "I'm searching for Organic Vegetables...",
    "Looking for fresh fruits...",
    "Explore healthy products...",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  useEffect(() => {
    const allProducts = [
      ...products.fruits,
      ...products.hotProducts,
      ...products.vegetables
    ];
    if (searchTerm) {
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  const handleSearch = () => {
    setShowModal(true); // Open the modal regardless of search results
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="sticky-navbar container-fluid">
      {/* Desktop Header */}
      <header className="d-none d-sm-flex justify-content-md-around align-items-center bg-success p-3 text-light">
        {/* First Section: Logo */}
        <div className="d-flex align-items-center ms-3">
          <Link to="/" className="text-decoration-none">
            <img src="/images/kisanlogo.jpg" alt="Kisan Logo" height="50px" />
          </Link>
        </div>

        {/* Second Section: Map Icon, Input, and Search Button */}
        <div className="d-flex justify-content-center align-items-center flex-grow-1 mx-4">
          <div className="border border-1 p-1 rounded rounded-2 me-3">
            <Link to="/dashboard" className="text-decoration-none">
              <button className="bi bi-geo-alt-fill mx-2 border-1 rounded rounded-3" aria-label="Location"></button>
            </Link>
          </div>
          <div className="position-relative">
            <div
              className="input-group"
              style={{ maxWidth: "100%", color: "white" }}
            >
              <input
                type="text"
                className="form-control "
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #ccc",
                }}
                placeholder={placeholders[placeholderIndex]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-warning" onClick={handleSearch} aria-label="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Third Section: Cart and Person Icons */}
        <div className="d-flex align-items-center">
        <div className="cart-icon-container position-relative">
            <Link to="cart" className="text-decoration-none text-dark d-flex flex-column align-items-center">
              <button className="bi bi-cart border-0 bg-transparent text-white" aria-label="Cart">
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle">
                  {cartQuantity}
                </span>
              </button>
            </Link>
            {/* Dropdown always rendered, but visibility controlled via CSS */}
            <CartDropdown />
          </div>
          <i className="me-3 ms-3">|</i>
          <Link to="/login" className="text-decoration-none">
            <button className="bi bi-person-circle border-0 mx-2 bg-transparent text-white" aria-label="Login"></button>
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="d-sm-none">
        <div className="d-flex flex-column">
          <div>
            <p className="h4">
              <span className="bi bi-geo-alt-fill"></span> Hyderabad, Telangana
            </p>
          </div>

          <div className="input-group w-100">
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-warning bi bi-search" onClick={handleSearch} aria-label="Search"></button>
          </div>
        </div>
      </header>

      {/* Search Results Modal */}
      <SearchModal showModal={showModal} handleClose={handleClose} searchResults={searchResults} />
    </div>
  );
}
