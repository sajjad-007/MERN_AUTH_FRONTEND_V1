import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Instructor from '../components/Instructor';
import Technologies from '../components/Technologies';
import '../styles/Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';
import Login from '../components/Login';
import Register from '../components/Register';

const Home = () => {
  const { setIsAuthenticated, isAuthenticated, setUser } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .post('http://localhost:4000/api/v1/user/logout',{},{withCredentials: true})
      .then(res => {
        toast.success(res.data.message);
        console.log(res.data.message)
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch(error => {
        toast.error(error.res.data.message);
        console.error('Error from logout', error);
      });
  };
  if (!isAuthenticated) {
    navigateTo('/auth');
  }
  return (
    <>
      <section className="home">
        <Hero />
        <Instructor />
        <Technologies />
        <Footer />
        <button onClick={handleLogout}>logout</button>
      </section>
    </>
  );
};

export default Home;
