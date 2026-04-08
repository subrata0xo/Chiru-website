import React, { createContext, useState, useEffect } from 'react';

export const DesignContext = createContext();

const defaultDesigns = [
  {
    id: 'hero-1',
    title: 'Avant-Garde Silhouettes',
    description: 'A contemporary minimalist avant-garde clothing design featuring soft, structured folds in sleek beige tones. The embodiment of pure elegance and architectural lines.',
    date: '2026-04-04',
    imageUrl: '/assets/hero_1.png'
  },
  {
    id: 'gallery-1',
    title: 'Silk Minimalist Dress',
    description: 'An elegant beige silk minimalist dress with smooth reflections. High-end luxury fashion aesthetic suitable for elite evenings.',
    date: '2026-04-03',
    imageUrl: '/assets/gallery_1.png'
  },
  {
    id: 'gallery-2',
    title: 'Structured Wool Coat',
    description: 'Modern structured wool coat in ash grey. Features a clean contemporary layout and an architectural silhouette.',
    date: '2026-04-02',
    imageUrl: '/assets/gallery_2.png'
  },
  {
    id: 'gallery-3',
    title: 'Noir Evening Gown',
    description: 'Minimalist black avant-garde evening gown. Pure luxury, elegant, sleek lines tailored for a striking high-fashion pose.',
    date: '2026-04-01',
    imageUrl: '/assets/gallery_3.png'
  }
];

export const DesignProvider = ({ children }) => {
  const [designs, setDesigns] = useState(() => {
    const saved = localStorage.getItem('luxury-fashion-designs');
    if (saved) return JSON.parse(saved);
    return defaultDesigns;
  });

  useEffect(() => {
    localStorage.setItem('luxury-fashion-designs', JSON.stringify(designs));
  }, [designs]);

  const addDesign = (newDesign) => {
    setDesigns([{ ...newDesign, id: Date.now().toString() }, ...designs]);
  };

  return (
    <DesignContext.Provider value={{ designs, addDesign }}>
      {children}
    </DesignContext.Provider>
  );
};
