import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCNZ54-eyalVKtV0BHXPEKjG5u1pRG1gmg",
  authDomain: "soc-set-3eabd.firebaseapp.com",
  projectId: "soc-set-3eabd",
  storageBucket: "soc-set-3eabd.firebasestorage.app",
  messagingSenderId: "364343506958",
  appId: "1:364343506958:web:2e11589aef293e7e7fe45f",
  measurementId: "G-K7HPQ8VZ8C"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);