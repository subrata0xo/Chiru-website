import React from 'react';
import PageTransition from '../components/PageTransition';
import './About.css';

const About = () => {
  return (
    <PageTransition className="page-wrapper container about-page">
      <div className="about-layout">
        <div className="about-content">
          <h1>About Us</h1>
          <p className="lead-text">
            Welcome to our store — where culture meets creativity. We are passionate about bringing the beauty of Bengali typography to life through uniquely designed T-shirts.
          </p>
          <div className="story-paragraphs">
            <p>
              Each design is thoughtfully crafted to reflect the richness of Bengali language, emotions, and identity, turning everyday fashion into a statement of culture and expression. Our collection offers a wide range of sizes from M to XXL, ensuring comfort and style for everyone.
            </p>
            <p>
              Whether you’re looking for something bold, artistic, or meaningful, our designs are made to stand out while staying deeply connected to Bengali roots.
            </p>
            <p>
              Looking for something truly personal? We’ve got you covered. We also offer customized T-shirt options, allowing you to bring your own ideas, phrases, or designs to life exactly the way you want.
            </p>
            <p>
              At our core, we believe clothing is more than just fabric — it’s a way to express who you are. And through our typography designs, we aim to help you wear your identity with pride. Thank you.
            </p>
          </div>
          <div className="contact-details">
            <h2><strong>Contact Details</strong></h2>
            <p>Contact no. :</p>
            <ul>
              <li>+919836429656</li>
              <li>+918017492830</li>
            </ul>
          </div>
        </div>
        <div className="about-visual">
          <div className="visual-block main-block"></div>
          <div className="visual-block accent-block"></div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
