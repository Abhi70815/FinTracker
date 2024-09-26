// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2p6oimaBDM9CEnBe2qEuSajouPNVE7OA",
  authDomain: "fintracker-df3a0.firebaseapp.com",
  projectId: "fintracker-df3a0",
  storageBucket: "fintracker-df3a0.appspot.com",
  messagingSenderId: "695694922630",
  appId: "1:695694922630:web:2d5dd479d4f5addd8bd207",
  measurementId: "G-8W6RNPWBH8"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app= initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc}