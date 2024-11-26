const handleSendOtp = async () => {
    if (!validateMobileNumber(mobileNumber)) {
      setErrorMessage('Invalid mobile number');
      return;
    }
    try {
      await axios.post('/api/sendOtp', { mobileNumber });
      setIsOtpSent(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error sending OTP:', error); // Log the full error
      setErrorMessage('Failed to send OTP');
    }
  };
  