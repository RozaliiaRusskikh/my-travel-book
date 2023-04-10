import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDK55S-e2Awp624gbRKPm8CnYvlT_h8XIs",
  authDomain: "my-travel-book-a9bbb.firebaseapp.com",
  projectId: "my-travel-book-a9bbb",
  storageBucket: "my-travel-book-a9bbb.appspot.com",
  messagingSenderId: "1036460866126",
  appId: "1:1036460866126:web:55d9928cb5f6e17e82e11f",
  measurementId: "G-DX0DZGK5ZH",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;
