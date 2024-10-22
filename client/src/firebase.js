// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-practice-p.firebaseapp.com",
  projectId: "real-state-practice-p",
  storageBucket: "real-state-practice-p.appspot.com",
  messagingSenderId: "647891821261",
  appId: "1:647891821261:web:6e1e2c541dfe24b1483f84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);