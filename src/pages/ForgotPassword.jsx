import React, { useContext, useState } from 'react';
import '../styles/ForgotPassword.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';

const ForgotPassword = () => {
  const {
    isLoading,
    setIsLoading,
  } = useContext(Context);
  const [email, setEmail] = useState('');
  const navigateTo = useNavigate();
  const handleForgotPassword = async e => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        'http://localhost:4000/api/v1/user/password/forgot',
        { email },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(res => {
        toast.success(res?.data?.message);
        console.log(res.data)
      })
      .catch(error => {
        toast.error(error?.res?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
        // navigateTo("/auth")
      });
  };
  return (
    <>
      <div>
        <div className="forgot-password-page">
          <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <p>Enter your email address to receive a password reset token.</p>
            <form
              onSubmit={handleForgotPassword}
              className="forgot-password-form"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="forgot-input"
              />
              {isLoading ? (
                <button className="forgot-btn">Please wait...</button>
              ) : (
                <button type="submit" className="forgot-btn">
                  Send Reset Link
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
