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

    //value is whatever the user typed into the current box.
    //index is the position of that box (0, 1, 2, ...).
    //If the user typed something (value is not empty) and the box is not the last one, then focus moves to the next input box.
    //Example => You type 5 in the first box (index = 0). Since it’s not the last box, the cursor automatically jumps to box 1.
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  //e.key === "Backspace" means the user pressed the backspace key.
  //otp[index] === "" means the current box is already empty.
  //index > 0 ensures it’s not the very first box.
  //If all that’s true, the cursor moves back to the previous box.
  //👉 Example => You’re at box 2 (index = 2), it’s empty, and you press backspace. The focus jumps back to box 1.
  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const handleOtpVerification = async e => {
    setIsLoading(true);
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
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setUser(null);
      setIsAuthenticated(false);
      console.error('Error from otp-verification', error);
    } finally {
      setIsAuthenticated(true);
      setIsLoading(false);
      navigateTo('/');
    }
  };
  if (isAuthenticated) {
    navigateTo('/');
  }

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
