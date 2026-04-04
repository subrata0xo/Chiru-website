import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Edit2, Trash2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { DesignContext } from '../context/DesignContext';
import './Admin.css';

const Admin = () => {
  const { designs, addDesign, updateDesign, deleteDesign } = useContext(DesignContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('manage'); // 'manage', 'add', 'edit'
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    storagePath: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (design) => {
    setFormData({
      title: design.title,
      description: design.description,
      date: design.date,
      imageUrl: design.imageUrl,
      storagePath: design.storagePath || ''
    });
    setImagePreview(design.imageUrl);
    setImageFile(null);
    setEditingId(design.id);
    setActiveTab('edit');
  };

  const handleDelete = async (id, storagePath) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      try {
        await deleteDesign(id, storagePath);
        alert("Design deleted.");
      } catch (e) {
        console.error(e);
        alert("Failed to delete design.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || (!imageFile && !formData.imageUrl)) {
      alert("Title and Image are required.");
      return;
    }
    
    setUploading(true);
    try {
      if (activeTab === 'add') {
        await addDesign(formData, imageFile);
        alert("Design published successfully!");
      } else if (activeTab === 'edit') {
        await updateDesign(editingId, formData, imageFile, formData.storagePath);
        alert("Design updated successfully!");
      }
      
      setFormData(initialForm);
      setImagePreview(null);
      setImageFile(null);
      setActiveTab('manage');
    } catch (e) {
      console.error(e);
      alert("An error occurred. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageTransition className="page-wrapper container admin-page">
      <div className="admin-header">
        <h1>Atelier Dashboard</h1>
        <p>Manage and curate your luxury fashion portfolio.</p>
        
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Library
          </button>
          <button 
            className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('add');
              setFormData(initialForm);
              setImagePreview(null);
              setImageFile(null);
            }}
          >
            Publish New Design
          </button>
          {activeTab === 'edit' && (
            <button className="admin-tab active">
              Editing Design
            </button>
          )}
        </div>
      </div>

      {activeTab === 'manage' && (
        <div className="manage-list">
          {designs.map(design => (
            <div key={design.id} className="manage-card">
              <img src={design.imageUrl} alt={design.title} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)' }}>{design.title}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{design.date}</p>
              </div>
              <div className="manage-actions">
                <button className="manage-btn-edit" onClick={() => startEdit(design)}>
                  <Edit2 size={14} style={{ marginRight: 6, display: 'inline' }} /> Edit
                </button>
                <button className="manage-btn-delete" onClick={() => handleDelete(design.id, design.storagePath)}>
                  <Trash2 size={14} style={{ marginRight: 6, display: 'inline' }} /> Delete
                </button>
              </div>
            </div>
          ))}
          {designs.length === 0 && (
            <p>No designs published yet.</p>
          )}
        </div>
      )}

      {(activeTab === 'add' || activeTab === 'edit') && (
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
                  <span>{imageFile ? imageFile.name : 'Select Image (Click or Tap)'}</span>
                </label>
              </div>
            </div>
            
            <button type="submit" disabled={uploading} className="btn-primary submit-btn">
              {uploading ? 'Processing...' : (activeTab === 'edit' ? 'Update Content' : 'Publish Content')}
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
      )}
    </PageTransition>
  );
};

export default Admin;
