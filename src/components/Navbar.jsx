import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Link as LinkIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Website link copied to clipboard!');
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="JS CREATION Logo" style={{ height: '40px', objectFit: 'contain' }} />
          </Link>
          
          <div className="navbar-links desktop-only">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            <button className="share-btn" onClick={copyToClipboard}>
              <LinkIcon size={14} /> Share
            </button>
          </div>

          <button className="mobile-menu-btn mobile-only" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
          <X size={28} />
        </button>
        <div className="mobile-links">
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <button onClick={copyToClipboard} style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text)' }}>Share</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
