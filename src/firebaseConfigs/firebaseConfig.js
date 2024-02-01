import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2XfMGeoFgqgYAJ7x54W5C3hfwg9SGFC8",
  authDomain: "active-fit-2201.firebaseapp.com",
  projectId: "active-fit-2201",
  storageBucket: "active-fit-2201.appspot.com",
  messagingSenderId: "489163007881",
  appId: "1:489163007881:web:5c8e52843d1afdb31ee358"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)