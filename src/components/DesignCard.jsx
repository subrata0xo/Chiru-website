import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DesignCard.css';

const DesignCard = ({ design }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link to={`/design/${design.id}`} className="design-card">
        <div className="card-image-wrapper">
          <img src={design.imageUrl} alt={design.title} className="card-image" />
          <div className="card-overlay glass">
            <span className="view-text">View Details</span>
          </div>
        </div>
        <div className="card-content">
          <h3 className="card-title">{design.title}</h3>
          <span className="card-date">{new Date(design.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric'})}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default DesignCard;
