// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApuNeEajTrT_E9h2PMGjfi9z3MoVytddI",
  authDomain: "e-store-vid.firebaseapp.com",
  projectId: "e-store-vid",
  storageBucket: "e-store-vid.appspot.com",
  messagingSenderId: "775527129146",
  appId: "1:775527129146:web:bef642092196840144d503",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
