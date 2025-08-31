import React, { useContext, useState } from 'react';
import '../styles/ResetPassword.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';

const ResetPassword = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    isLoading,
    setIsLoading,
  } = useContext(Context);
  const { token } = useParams();  
  const navigateTo = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleResetPassword = async e => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        toast.success(res?.data?.message);
        setUser(res.data.user);
        setIsAuthenticated(true);
        console.log(res);
      })
      .catch(error => {
        toast.error(error?.res?.data?.message);
        setUser(null);
        setIsAuthenticated(false);
        console.error('Error from reset password', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isAuthenticated) {
    navigateTo('/auth');
  }
  return (
    <>
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          <p>Enter Your Password Below.</p>
          <form onSubmit={handleResetPassword} className="reset-password-form">
            <input
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="reset-input"
              required
            />
            <input
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="reset-input"
              required
            />
            {isLoading ? (
              <button className="reset-btn">Password Reseting....</button>
            ) : (
              <button type="submit" className="reset-btn">
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
