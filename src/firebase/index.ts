import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_APIKEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APPID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
