import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import DesignCard from '../components/DesignCard';
import { DesignContext } from '../context/DesignContext';
import './Gallery.css';

const Gallery = () => {
  const { designs } = useContext(DesignContext);
  
  return (
    <PageTransition className="page-wrapper gallery-page container">
      <div className="gallery-header">
        <h1 className="page-title">The Collection</h1>
        <p className="page-subtitle">Explore our latest curations and timeless pieces.</p>
      </div>

      <motion.div 
        className="gallery-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <DesignCard design={design} />
          </motion.div>
        ))}
      </motion.div>
    </PageTransition>
  );
};

export default Gallery;
