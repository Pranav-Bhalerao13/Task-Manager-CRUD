import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiEogOAujXY4TBmPXKiOF10KR766gfgWk",
  authDomain: "task-manager-8272e.firebaseapp.com",
  projectId: "task-manager-8272e",
  storageBucket: "task-manager-8272e.firebasestorage.app",
  messagingSenderId: "958341496749",
  appId: "1:958341496749:web:ed68828a76caf90dab6b24",
  measurementId: "G-ZLQ3QQ0F5Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);