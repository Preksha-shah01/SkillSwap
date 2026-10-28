
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxEPLdEhd4dej4vSnseVnMe97fxS5dRVg",
  authDomain: "skillswap-c596f.firebaseapp.com",
  projectId: "skillswap-c596f",
  storageBucket: "skillswap-c596f.firebasestorage.app",
  messagingSenderId: "535030369077",
  appId: "1:535030369077:web:a7f267be3552a6d5769a7c",
  measurementId: "G-VKGNXZ3P4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

