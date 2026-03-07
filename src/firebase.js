// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB8JIcbJ1xZ75nayo5bBShaarHFsY6m18",
  authDomain: "starter-ffa16.firebaseapp.com",
  projectId: "starter-ffa16",
  storageBucket: "starter-ffa16.firebasestorage.app",
  messagingSenderId: "1009381453835",
  appId: "1:1009381453835:web:897f2511744fdbb627170e",
  measurementId: "G-BQ9GJBMDL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);