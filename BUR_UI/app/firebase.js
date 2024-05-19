// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG0c-dB4JBMTDfFSoQElmKn7xoX32Rmf8",
  authDomain: "dating-app-9863f.firebaseapp.com",
  projectId: "dating-app-9863f",
  storageBucket: "dating-app-9863f.appspot.com",
  messagingSenderId: "930823282482",
  appId: "1:930823282482:web:c33bcf889482901784412b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };