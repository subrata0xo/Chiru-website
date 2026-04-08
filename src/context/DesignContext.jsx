import React, { createContext, useState, useEffect } from 'react';

export const DesignContext = createContext();

const defaultDesigns = [
  {
    id: 'design-1',
    title: 'Nostalgic Typography Tee',
    description: 'A crisp white everyday graphic tee featuring bold Bengali typography. The colorful text “এটা কি 2441139?” embraces retro cultural nostalgia with a playful, laid-back vibe. Perfect for street casual outfits.',
    date: '2026-04-08',
    imageUrl: '/assets/design_1.jpg'
  },
  {
    id: 'design-2',
    title: 'Postage Stamp Graphic Tee',
    description: 'A sleek black minimalist t-shirt accented with twin vintage postage stamp designs on the chest reading "চিঠি দিও". A clever nod to classic correspondence, bridging the gap between digital-age fashion and analog memories.',
    date: '2026-04-08',
    imageUrl: '/assets/design_2.jpg'
  },
  {
    id: 'design-3',
    title: 'Neon Script Statement Shirt',
    description: 'Featuring a bold stack of neon orange Bengali typography that translates to "শেষ ট্রেনে ঘরে ফিরবো না", this black tee offers an edgy, urban look. It speaks to late-night adventures and rebellion, with a high-contrast futuristic feel.',
    date: '2026-04-08',
    imageUrl: '/assets/design_3.jpg'
  },
  {
    id: 'design-4',
    title: 'Verified Fan Badge Tee',
    description: 'A clean, modern black graphic tee featuring the text "ফেলুদা ভক্ত" accompanied by a signature blue verification checkmark. An essential statement piece declaring ultimate fandom with a crisp, contemporary aesthetic.',
    date: '2026-04-08',
    imageUrl: '/assets/design_4.jpg'
  },
  {
    id: 'design-5',
    title: 'Acoustic Soul Print',
    description: 'This artistic black t-shirt beautifully highlights a traditional Dotara string instrument over a rich golden-yellow brushstroke background, with "মিলন হবে কত দিনে" typography. A poetic and soulful tribute to folk heritage.',
    date: '2026-04-08',
    imageUrl: '/assets/design_5.jpg'
  }
];

export const DesignProvider = ({ children }) => {
  const [designs, setDesigns] = useState(() => {
    // New storage key to force resetting to the new designs
    const saved = localStorage.getItem('js-creation-designs-v2');
    if (saved) return JSON.parse(saved);
    return defaultDesigns;
  });

  useEffect(() => {
    localStorage.setItem('js-creation-designs-v2', JSON.stringify(designs));
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
