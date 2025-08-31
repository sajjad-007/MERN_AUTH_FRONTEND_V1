import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context } from './main';
import OtpVerification from './pages/OtpVerification';
import InvalidRoute from './pages/InvalidRoute';

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const getLoggedInUser = async () => {
      await axios
        .get('http://localhost:4000/api/v1/user/getUser', {
          withCredentials: true,
        })
        .then(res => {
          setUser(res?.data?.user);
          setIsAuthenticated(true);
        })
        .catch(error => {
          toast.error(error?.res?.data?.message);
          setUser(null);
          setIsAuthenticated(null);
        });
    };
    getLoggedInUser();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/otp-verification/:email/:phone"
            element={<OtpVerification />}
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/password/:token" element={<ResetPassword />} />
          <Route path="*" element={<InvalidRoute />} />
          
        </Routes>
        <ToastContainer theme="colored" />
      </Router>
    </>
  );
};

export default App;
