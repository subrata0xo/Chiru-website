import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import DesignCard from '../components/DesignCard';
import { DesignContext } from '../context/DesignContext';
import './Home.css';

const Home = () => {
  const { designs } = useContext(DesignContext);
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 800], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const imgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const decorativeY = useTransform(scrollY, [0, 800], [0, -150]);

  const heroDesign = designs.length > 0 ? designs[0] : null;
  const latestDesigns = designs.slice(1, 4);

  return (
    <PageTransition className="page-wrapper home-page">
      {/* Hero Brand Section */}
      <section className="brand-hero container">
        <motion.div
          className="brand-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="brand-title">JS CREATION</h1>
          <p className="brand-subtitle">Daily Clothing Designs</p>
          <div className="brand-line"></div>
        </motion.div>
      </section>

      {heroDesign && (
        <section className="hero-section container">
          <motion.div 
            className="hero-content"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.span 
              className="overline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Today's Drop
            </motion.span>
            <motion.h2 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {heroDesign.title}
            </motion.h2>
            <motion.p 
              className="hero-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {heroDesign.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link to={`/design/${heroDesign.id}`} className="btn-primary">
                Discover <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
          <div className="hero-image-container">
            <motion.img 
              src={heroDesign.imageUrl} 
              alt={heroDesign.title} 
              className="hero-image" 
              style={{ scale: imgScale }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div 
              className="decorative-element glass"
              style={{ y: decorativeY }}
              initial={{ opacity: 0, rotate: -90, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              No. 01
            </motion.div>
          </div>
        </section>
      )}

      {latestDesigns.length > 0 && (
        <section className="latest-section container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Latest Drops</h2>
            <Link to="/gallery" className="link-text">View All</Link>
          </motion.div>
          <div className="grid-layout">
            {latestDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <DesignCard design={design} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </PageTransition>
  );
};

export default Home;
