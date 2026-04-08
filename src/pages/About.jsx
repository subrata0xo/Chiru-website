import React from 'react';
import PageTransition from '../components/PageTransition';
import './About.css';

const About = () => {
  return (
    <PageTransition className="page-wrapper container about-page">
      <div className="about-layout">
        <div className="about-content">
          <h1>The Vision</h1>
          <p className="lead-text">
            JS CREATION was founded on the belief that fashion is a form of self-expression — bold, unapologetic, and ever-evolving. We design for the modern individual who dares to stand out.
          </p>
          <div className="story-paragraphs">
            <p>
              Each piece in our collection is crafted with precision and purpose. We believe in the power of clean lines, structured silhouettes, and the quiet confidence that comes from wearing something truly exceptional.
            </p>
            <p>
              Our designs are showcased exclusively here — a digital atelier where every creation tells a story. This is where fashion meets the future.
            </p>
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
