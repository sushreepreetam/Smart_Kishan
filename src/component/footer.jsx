import React from 'react';
import './footer.css'; // Create this file for custom styles

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark pt-5">
      <div className="container">
        <div className="row">
          {/* Logo and Contact Information */}
          <div className="col-md-3">
            <img
              src="/images/kisanlogo.jpg"
              alt="Logo"
              className="img-fluid mb-3"
            />
            <p>Hyderabad, Telangana</p>
            <p>
              <a href="mailto:kingkisanghar@gmail.com">
                kingkisanghar@gmail.com
              </a>
            </p>
          </div>

          {/* My Account Section */}
          <div className="col-md-2">
            <h5>My Account</h5>
            <ul className="list-unstyled">
              <li><a href="#profile">Profile & Details</a></li>
              <li><a href="#order-history">Order History</a></li>
              <li><a href="#address">Address Manage</a></li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="col-md-2">
            <h5>Information</h5>
            <ul className="list-unstyled">
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Who Are We Section */}
          <div className="col-md-2">
            <h5>Who Are We?</h5>
            <ul className="list-unstyled">
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <p>(+91) 9014 775 214</p>
            <p>
              Email Address:{' '}
              <a href="mailto:kingkisanghar@gmail.com">
                kingkisanghar@gmail.com
              </a>
            </p>
            <div className="download-apps">
              <p>Download App:</p>
              <a href="#play-store">
                <img
                  src="/images/playstore.svg"
                  alt="Google Play"
                  className="img-fluid"
                  width="120"
                />
              </a>
              <a href="#app-store" className="ml-2">
                <img
                  src="/images/appstore.svg"
                  alt="App Store"
                  className="img-fluid"
                  width="120"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row mt-4">
          <div className="col-md-6">
            <p>©2024 Powered By Dexterous Technology</p>
          </div>
          <div className="col-md-6 text-md-right">
            <img src="/images/1.png" alt="PayPal" className="payment-icons" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
