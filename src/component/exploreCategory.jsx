import React from "react";
import "./ProductSection.css";

export function ExploreCategory(){
      
    const categories = [
        { name: "Fresh vegetables", img: "/images/fresh-vegetable.jpg" },
        { name: "Meat masala", img: "/images/meat-masala.jpg" },
        { name: "Pharma and hygiene", img: "/images/pharma-&-hygenic.avif" },
        { name: "Baby care", img: "/images/baby-care.jpg" },
        { name: "Fresh fruits", img: "/images/fresh-fruit.jpg" },
        { name: "Dry fruits, oils, and masalas", img: "/images/dry fruits-oil-masala.jpg" },
        { name: "Fish & seafood", img: "/images/fish-seafood.jpg" },
        { name: "Bakery", img: "/images/bakery.jpg" },
        { name: "Dairy and bread", img: "/images/dairy-bread.jpg" },
        { name: "Mutton", img: "/images/mutton.jpg" },
        { name: "Instant food", img: "/images/instant-food.jpg" },
        { name: "Eggs", img: "/images/eggs.webp" },
        { name: "Ready to cook", img: "/images/ready-to-cook.png" },
        { name: "Cold cuts", img: "/images/cold-cuts.png" },
        { name: "Spreads", img: "/images/spreads.png" },
        { name: "Prawns", img: "/images/prawn.webp" }
      ];
    return(
        <div className=" container-fluid">
             <section>
      <div className="container p-4">
      <h6><strong>Explore Categories</strong></h6>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-6 col-md-4 col-lg-2 mb-3" key={index}>
            <div className="card h-100">
              <img
                src={category.img}
                alt={category.name}
                className="card-img-top img-fluid"
                style={{ height: '150px', objectFit: 'contain' }}
              />
              <div className="card-body text-center">
                <p className="card-text">{category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      </section>
        </div>
    )
}