import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminLayout = () => {
  return (
    <>
      <div style={{ padding: '20px 40px', display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text)', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Return to Site
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
