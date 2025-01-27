// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "form-open-dental.firebaseapp.com",
  projectId: "form-open-dental",
  storageBucket: "form-open-dental.firebasestorage.app",
  messagingSenderId: "260086659533",
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);