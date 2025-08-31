import React, { useContext } from 'react';
import '../styles/Instructor.css';
import instructorImage from '../assets/profile.jpg';
import { Context } from '../main';

const Instructor = () => {
  return (
    <div className="instructor-page">
      <div className="instructor-card">
        <div className="instructor-image">
          <img src={instructorImage} alt="Instructor" />
        </div>
        <div className="instructor-info">
          <h1>Sajjad Hossain</h1>
          <h4>Author</h4>
          <p>
            Hi there, I'm Sajjad I am a MERN Stack Developer with experience
            building scalable, full-stack web applications using MongoDB,
            Express.js, React, and Node.js. I specialize in designing RESTful
            APIs, developing responsive front-end interfaces, and integrating
            secure authentication and database solutions. My focus is on writing
            clean, maintainable code and delivering efficient solutions that
            improve user experience. I enjoy working on real-world projects,
            solving technical problems, and continuously learning modern web
            technologies to sharpen my skills.
          </p>
          <div className="social-links">
            <a
              href="https://github.com/sajjad-007"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://sajjad-portfolioo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
