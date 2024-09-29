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
  apiKey: "AIzaSyDOvF1D5ddPPYKYgcSOnd4RL0M8bvuFnDk",
  authDomain: "valnet-a5d18.firebaseapp.com",
  projectId: "valnet-a5d18",
  storageBucket: "valnet-a5d18.appspot.com",
  messagingSenderId: "177569600912",
  appId: "1:177569600912:web:3e41909e42a29f3f398f15"
  };

// Initialize Firebase

initializeApp(firebaseConfig);

export const database = getFirestore();

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
