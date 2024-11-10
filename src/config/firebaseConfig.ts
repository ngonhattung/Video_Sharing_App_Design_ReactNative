import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyASxfH_QfefA38Jf49rJRc1trfhtwA72B4",
  authDomain: "video-sharing-app-29f4a.firebaseapp.com",
  projectId: "video-sharing-app-29f4a",
  storageBucket: "video-sharing-app-29f4a.firebasestorage.app",
  messagingSenderId: "876002728120",
  appId: "1:876002728120:web:54e3a7c8f120c27b163c4d",
  measurementId: "G-FRFWX21VL7",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
