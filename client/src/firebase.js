// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-d010d.firebaseapp.com",
  projectId: "real-estate-d010d",
  storageBucket: "real-estate-d010d.firebasestorage.app",
  messagingSenderId: "1031364955210",
  appId: "1:1031364955210:web:3f9c15027d4e0387d3aab3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);