import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DesignProvider } from './context/DesignContext';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Lazy load pages for fast loading
const Home = React.lazy(() => import('./pages/Home'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const DesignDetail = React.lazy(() => import('./pages/DesignDetail'));
const About = React.lazy(() => import('./pages/About'));
const Admin = React.lazy(() => import('./pages/Admin'));

const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.2em', color: 'var(--color-muted)' }}>Loading...</div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes with Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}><Home /></Suspense>
          } />
          <Route path="/gallery" element={
            <Suspense fallback={<PageLoader />}><Gallery /></Suspense>
          } />
          <Route path="/design/:id" element={
            <Suspense fallback={<PageLoader />}><DesignDetail /></Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<PageLoader />}><About /></Suspense>
          } />
        </Route>
        
        {/* Admin Routes without Public Navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}><Admin /></Suspense>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <DesignProvider>
      <BrowserRouter>
        <div className="app">
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </DesignProvider>
  );
}

export default App;
