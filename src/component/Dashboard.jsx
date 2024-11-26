import React, { useState } from 'react';
import "./ProductSection.css";
import StickyFooter from './StickyFooter';
import { MobileNav } from './mobileHeader';
import { Navbar } from './Navbar';
import Footer from './footer';
import { useLocation } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState('dashboard');
  const location = useLocation(); // Access the passed data from login

  // Extract data passed from login form
  const { formData } = location.state || {
    formData: { name: 'Unknown', email: 'unknown@example.com', country: 'Unknown' },
  };

  const renderContent = () => {
  
    if (selectedView === 'dashboard') {
      return (
        <div className="wallet-details">
        <h3>Profile Name</h3>
        <p><strong>Name: </strong> {formData.name}</p>
        <p><strong>Email Address: </strong> {formData.email}</p>
        <p><strong>Country / Region: </strong> {formData.country}</p>
        <p><strong>Year Registered: </strong> {new Date().getFullYear()}</p>
      </div>
      );
    } else if (selectedView === 'address') {
      return (
        <div className="address-details">
          <h3>Address Information</h3>
          <p><strong>Street: </strong> 123 Main St</p>
          <p><strong>City: </strong> Mumbai</p>
          <p><strong>Postal Code: </strong> 400001</p>
        </div>
      );
    } 
    };

  return (
     <div >
        <div className="d-none d-md-block">
      <Navbar/>
     </div>
     <div className="d-block d-md-none">
     <MobileNav/>
     </div>
         <div className="dashboard-container">
         
         <div className='col'>
         <div className='row bg-light-subtle d-flex justify-content-center align-items-center' style={{height:"200px"}} >
          <img src="/images/user.png" alt="user" id='user' />      
        </div>   
      {/* Sidebar */}
      <div className="sidebar col">
        <ul className="menu">
          <li onClick={() => setSelectedView('dashboard')}><strong> Dashboard</strong></li>
          <li onClick={() => setSelectedView('address')}><strong>Address</strong></li>
          <Link to="/login" className=' text-decoration-none'><li><strong>Log Out</strong></li></Link>
        </ul>
      </div>
         </div>

      {/* Content Section */}
      <div className="content-section">
        <h2 className=' mb-3'>My Wallet :</h2>
        {renderContent()}
     
    </div>

    </div>
      <div className="d-none d-md-block">
      <Footer/>
     </div>
     <div className="d-block d-md-none">
      <StickyFooter/>
     </div>
     </div>
  );
};

export default Dashboard;