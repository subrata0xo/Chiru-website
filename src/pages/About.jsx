import React from 'react';
import PageTransition from '../components/PageTransition';
import './About.css';

const About = () => {
  return (
    <PageTransition className="page-wrapper container about-page">
      <div className="about-layout">
        <div className="about-content">
          <h1>The Art of Minimalism</h1>
          <p className="lead-text">
            Holovetra was founded on the principle that true luxury is quiet, structured, and inherently timeless. We remove the excess to focus strictly on silhouette, drape, and material integrity.
          </p>
          <div className="story-paragraphs">
            <p>
              Each piece in our collection is treated as an architectural endeavor. We believe fashion should not scream for attention, but rather command respect through its flawless construction and deliberate proportions.
            </p>
            <p>
              By embracing negative space both in our garments and our presentation, we allow the garment to speak its own truth. Our collections are exclusively showcased here, serving as a digital atelier for the modern connoisseur.
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
