import React, { useContext, useState } from 'react';
import '../styles/Auth.css';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const { isLogin, setIsLogin } = useState(true);
  const navigateTo = useNavigate();
  
  if (isAuthenticated) {
    navigateTo('/');
  }
  return (
    <>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            ></button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            ></button>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
};

export default Auth;
