// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_hjuS1pS4YpH9SlnpfGud_Ttq0qBPXeI",
  authDomain: "privateresult-879.firebaseapp.com",
  projectId: "privateresult-879",
  storageBucket: "privateresult-879.firebasestorage.app",
  messagingSenderId: "88264929526",
  appId: "1:88264929526:web:5ecd8e9c537e57acba3cd7",
  measurementId: "G-3KNK6P3NTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional - only works in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Export analytics if needed
export { analytics };

export default app;