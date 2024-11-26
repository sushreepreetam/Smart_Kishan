import React, { useState, useEffect } from "react";
import './ProductSection.css';

export function MobileNav(){
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
      }, [placeholders.length])
    return(
        <div className="d-flex flex-column p-3">
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
          />
          <button className="btn btn-warning bi bi-search"></button>
        </div>
      </div>
    )
}