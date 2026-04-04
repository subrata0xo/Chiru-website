import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { DesignContext } from '../context/DesignContext';
import './DesignDetail.css';

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designs } = useContext(DesignContext);
  
  const design = designs.find(d => d.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!design) return <div className="page-wrapper container">Design Not Found</div>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
  };

  return (
    <PageTransition className="detail-page">
      <div className="detail-layout">
        <div className="detail-image-section">
          <button className="back-button glass" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <img src={design.imageUrl} alt={design.title} className="detail-image" />
        </div>
        
        <div className="detail-content-section">
          <div className="content-inner">
            <span className="detail-date">{new Date(design.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</span>
            <h1 className="detail-title">{design.title}</h1>
            
            <div className="detail-desc">
              <p>{design.description}</p>
            </div>
            
            <div className="detail-actions">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-instagram">
                DM on Instagram for purchase
              </a>
              <button className="btn-icon" onClick={handleCopyLink} title="Share Link">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DesignDetail;
