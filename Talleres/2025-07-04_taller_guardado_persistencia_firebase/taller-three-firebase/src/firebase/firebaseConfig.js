// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXf_puBcZI-qCn0wVC7K3MgH4hIlU7-RU",
  authDomain: "tallerpersistenciafirebase.firebaseapp.com",
  databaseURL: "https://tallerpersistenciafirebase-default-rtdb.firebaseio.com",
  projectId: "tallerpersistenciafirebase",
  storageBucket: "tallerpersistenciafirebase.firebasestorage.app",
  messagingSenderId: "129477587295",
  appId: "1:129477587295:web:9e8aff0138f823e58e86ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
