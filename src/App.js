import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home'; // Adjust import path if needed
import { Cart } from './component/cart';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import { Category } from './component/category';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/category" element={<Category />} />
      

    </Routes>
  );
}

export default App;
