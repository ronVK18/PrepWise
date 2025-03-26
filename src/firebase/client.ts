// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBm3Zii4V7ReeMhf6LBmUmHVY0pzwtjT-0",
  authDomain: "prepwise-7a55c.firebaseapp.com",
  projectId: "prepwise-7a55c",
  storageBucket: "prepwise-7a55c.firebasestorage.app",
  messagingSenderId: "336789841987",
  appId: "1:336789841987:web:98cda4ab6efb9a786e4cf6",
  measurementId: "G-J7HXVW78EM"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

