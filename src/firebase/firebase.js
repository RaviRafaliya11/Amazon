import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtAUk9dMSZelmj3UxsOkEBCJDQZEqLWnQ",
  authDomain: "fir-73dfb.firebaseapp.com",
  databaseURL: "https://fir-73dfb-default-rtdb.firebaseio.com",
  projectId: "fir-73dfb",
  storageBucket: "fir-73dfb.appspot.com",
  messagingSenderId: "197117648786",
  appId: "1:197117648786:web:41eead395efefd61a46b4b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
export const auth = getAuth();
