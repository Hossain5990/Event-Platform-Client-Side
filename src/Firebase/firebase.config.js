// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKKs1RHewviD6kYRwsJ8UcAwKZFvX2GWE",
  authDomain: "event-platform-client-side.firebaseapp.com",
  projectId: "event-platform-client-side",
  storageBucket: "event-platform-client-side.firebasestorage.app",
  messagingSenderId: "584921904459",
  appId: "1:584921904459:web:6decc6ca211a73684a24ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);