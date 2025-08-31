import React, { useContext } from 'react';
import '../styles/Hero.css';
import heroImage from '../assets/img1.png';
import { Context } from '../main';

const Hero = () => {
  const { user } = useContext(Context);
  return (
    <>
      <div className="hero-section">
        <img src={heroImage} alt="hero-image" />
        <h4>Hello, {user ? user?.fullName : 'Developer'}</h4>
        <h1>Welcome to MERN Authentication Application</h1>
        <p>
          A complete user Authentication application created using MERN Stack.
        </p>
      </div>
    </>
  );
};

export default Hero;
