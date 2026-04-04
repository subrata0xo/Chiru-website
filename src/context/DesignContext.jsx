import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';

export const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore Real-time Listener
  useEffect(() => {
    const q = query(collection(db, 'designs'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const designList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDesigns(designList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Upload to Storage & Save to Firestore
  const addDesign = async (formData, imageFile) => {
    let imageUrl = formData.imageUrl || ''; // fallback if it's already a URL
    let storagePath = '';

    if (imageFile) {
      storagePath = `designs/${Date.now()}_${imageFile.name}`;
      const imageRef = ref(storage, storagePath);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const payload = {
      ...formData,
      imageUrl,
      storagePath,
      date: formData.date || new Date().toISOString()
    };

    return await addDoc(collection(db, 'designs'), payload);
  };

  const updateDesign = async (id, formData, imageFile, oldStoragePath) => {
    let imageUrl = formData.imageUrl;
    let storagePath = formData.storagePath;

    if (imageFile) {
      // Upload new image
      storagePath = `designs/${Date.now()}_${imageFile.name}`;
      const imageRef = ref(storage, storagePath);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);

      // Clean up old image if it existed in Storage
      if (oldStoragePath) {
        try {
          const oldRef = ref(storage, oldStoragePath);
          await deleteObject(oldRef);
        } catch (e) {
          console.error("Failed to delete old image:", e);
        }
      }
    }

    const docRef = doc(db, 'designs', id);
    return await updateDoc(docRef, { ...formData, imageUrl, storagePath });
  };

  const deleteDesign = async (id, storagePath) => {
    if (storagePath) {
      try {
        const imageRef = ref(storage, storagePath);
        await deleteObject(imageRef);
      } catch (e) {
        console.error("Failed to delete image:", e);
      }
    }
    const docRef = doc(db, 'designs', id);
    return await deleteDoc(docRef);
  };

  return (
    <DesignContext.Provider value={{ designs, addDesign, updateDesign, deleteDesign, loading }}>
      {children}
    </DesignContext.Provider>
  );
};
