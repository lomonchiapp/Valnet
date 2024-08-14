// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBTYIbDuBiPSjM7ZwEL1LVqPpCCNolUS5k",
    authDomain: "ixiturn.firebaseapp.com",
    databaseURL: "https://ixiturn-default-rtdb.firebaseio.com",
    projectId: "ixiturn",
    storageBucket: "ixiturn.appspot.com",
    messagingSenderId: "175412055535",
    appId: "1:175412055535:web:cdfe49fa4cb4a0a6323a1a"
  };

// Initialize Firebase

initializeApp(firebaseConfig);

export const database = getFirestore();

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
