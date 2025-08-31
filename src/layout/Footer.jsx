import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import git from "../assets/git.png";
import user from "../assets/user.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>MERN Authentication</h2>
          <p>Your ultimate guide to mastering the MERN stack.</p>
        </div>
        <div className="footer-social">
          <h3>Follow Me</h3>
          <div className="social-icons">
            
            <Link
              to="https://sajjad-portfolioo.netlify.app/"
              target="_blank"
              className="social-link"
            >
              <img src={user} alt="portfolio" />
            </Link>
            <Link
              to="https://github.com/sajjad-007"
              target="_blank"
              className="social-link"
            >
              <img src={git} alt="GitHub" />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MERN Authentication. All Rights Reserved.</p>
        <p>Designed by CodeWithZeeshu</p>
      </div>
    </footer>
  );
};

export default Footer;
