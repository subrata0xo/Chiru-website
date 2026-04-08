import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { DesignContext } from '../context/DesignContext';
import './Admin.css';

const Admin = () => {
  const { addDesign } = useContext(DesignContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert("Title and Image are required.");
      return;
    }
    
    addDesign(formData);
    alert("Design published successfully!");
    navigate('/gallery');
  };

  return (
    <PageTransition className="page-wrapper container admin-page">
      <div className="admin-header">
        <h1>Atelier Dashboard</h1>
        <p>Publish a new design to the curation.</p>
      </div>

      <div className="admin-content">
        <form className="upload-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Design Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. Silk Minimalist Dress"
              className="glass-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Tell the story behind the piece..."
              className="glass-input"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              className="glass-input"
            />
          </div>

          <div className="form-group image-upload-group">
            <label>Artwork / Photograph</label>
            <div className="upload-area">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                id="file-upload" 
                className="file-input-hidden"
              />
              <label htmlFor="file-upload" className="upload-label glass">
                <Upload size={24} />
                <span>Select Image</span>
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn-primary submit-btn">
            Publish Content
          </button>
        </form>

        <div className="preview-section">
          <label>Live Preview</label>
          <div className="preview-card glass">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            ) : (
              <div className="preview-placeholder">Image will appear here</div>
            )}
            <div className="preview-text">
              <h3>{formData.title || 'Design Title'}</h3>
              <p>{formData.description || 'Description snippet'}</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Admin;
