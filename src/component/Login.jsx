 import React, { useState, useEffect } from 'react';
import './Login.css'; // Create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', country: '' });
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();


  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha(); 
  }, []);

  const validateCaptcha = () => captcha === captchaInput;

  const handleFormSubmit = () => {
    if (!mobileNumber || !captchaInput || !formData.name || !formData.email || !formData.country) {
      alert("Please complete all the fields.");
    } else if (!validateCaptcha()) {
      setCaptchaError("Captcha is incorrect. Please try again.");
      generateCaptcha();
    } else {
      setCaptchaError('');
      navigate('/dashboard', { state: { formData } });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome To KisanGhar</h2>
        <p>Log in or Sign up</p>

        {/* Mobile Number Input */}
        <input
        id='mobile'
          type="text"
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        {/* Captcha Section */}
        {mobileNumber && (
          <div className="captcha-section">
            <label>Captcha: {captcha}</label>
            <input
              type="text"
              id='captcha'
              placeholder="Enter Captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            {captchaError && <p className="error">{captchaError}</p>}
          </div>
        )}

        {/* Additional form fields after captcha verification */}
        {mobileNumber && validateCaptcha() && (
          <>
            <input
              type="text"
              id='name'
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              id='email'
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="text"
              id='country'
              placeholder="Enter Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </>
        )}

        <button id='submit' onClick={handleFormSubmit}>Continue</button>
        <p>
          By continuing, you agree to KisanGhar <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;

