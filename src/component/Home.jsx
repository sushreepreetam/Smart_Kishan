import React from "react";
import "./ProductSection.css";
import { Navbar } from "./Navbar";
import { Carousel } from "./Carousel";
import { Vegitable } from "./Vegetable";
import { Fruits } from "./fruits";
import { Bestseller } from "./bestseller";
import { ExploreCategory } from "./exploreCategory";
import { HotProduct } from "./hotProduct";
import StickyFooter from "./StickyFooter";
import Footer from "./footer";
import "./footer.css"







    function Home(){
  return (
    <div className="container-fluid p-0">
    {/* NavBar */}
    <Navbar />
    {/* Carousal */}
    <Carousel/>
    {/* Vegitable  */}
    <Vegitable/>
    {/*Organic Fruits*/}
    <Fruits/>
    {/* Best Seller*/}
    <Bestseller/>
    {/* Explore Category */}
    <ExploreCategory/>
     {/* Hot Products */}
    <HotProduct/>
    {/* Web footer */}
    <div className="d-none d-md-block">
      <Footer/>
     </div>
     <div className="d-block d-md-none">
      <StickyFooter/>
     </div>
    </div>
  );
};

export default Home;
