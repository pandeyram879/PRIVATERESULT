// src/components/ProtectedRoute.Agar tum chahte ho ki kuch pages sirf logged-in users dekh sakein:
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    // User logged in nahi hai, to login page pe redirect karo
    window.location.href = '/login';
    return null;
  }

  // User logged in hai, to children render karo
  return children;
}