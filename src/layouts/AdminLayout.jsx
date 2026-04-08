import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminLayout = () => {
  return (
    <>
      <div style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', background: '#000' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: '300', letterSpacing: '0.1em', color: '#999', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s' }}>
          <ArrowLeft size={16} /> Return to Site
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
