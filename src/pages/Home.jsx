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

const Home = () => {
  const [isAuthenticated, setIsAuthenticated, setUser] = useContext(Context);
  return <></>;
};

export default Home;
