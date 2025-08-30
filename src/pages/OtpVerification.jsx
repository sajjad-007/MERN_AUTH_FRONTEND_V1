import React, { useContext, useState } from 'react';
import '../styles/OtpVerification.css';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { use } from 'react';
import { Context } from '../main';

const OtpVerification = () => {
  const { email, phoneNumber } = useParams();
  const navigateTo = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    isLoading,
    setIsLoading,
  } = useContext(Context);
  const [otp, setOtp] = useState(['', '', '', '', '', '', '']);
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const handleOtpVerification = async e => {
    setIsAuthenticated(false);
    e.preventDefault();
    const enteredOTP = otp.join('');
    const data = {
      email,
      phoneNumber,
      otp: enteredOTP,
    };
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/otp-verification',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
        toast.success(response.data.message);
        setUser(response.data)
        setIsAuthenticated(true)
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      setUser(null);
      setIsAuthenticated(false);
      console.error('Error from otp-verification', error);
    } finally {
      if (isAuthenticated) {
        navigateTo('/');
      }
    }
  };

  return (
    <>
      <div className="otp-verification-page">
        <div className="otp-container">
          <h1>OTP Verification</h1>
          <p>Enter the 7-digit OTP sent to your registered email or phone.</p>
          <form className="otp-form" onSubmit={handleOtpVerification}>
            <div className="otp-input-container">
              {otp.map((item, index) => (
                <input
                  type="text"
                  id={`otp-input-${index}`}
                  className="otp-input"
                  value={item}
                  key={index}
                  maxLength={1}
                  onChange={e => handleChange(e.target.value, index)}
                  onKeyDown={e => handleOnKeyDown(e, index)}
                />
              ))}
            </div>
            {isLoading ? (
              <button className="verify-button">Please wait...</button>
            ) : (
              <button type="submit" className="verify-button">
                verify otp
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
