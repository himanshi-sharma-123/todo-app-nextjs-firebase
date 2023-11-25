// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3D0Hb-gfRIZ8-qDrpsG7Pl78ldkfCHV4",
  authDomain: "todo-84042.firebaseapp.com",
  projectId: "todo-84042",
  storageBucket: "todo-84042.appspot.com",
  messagingSenderId: "7224383213",
  appId: "1:7224383213:web:5de7e21704f56b44661ee4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
