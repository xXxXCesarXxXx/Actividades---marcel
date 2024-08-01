import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtjz-usAgR6z_BLgZrDX42H7CV0Z9yHLI",
  authDomain: "actividades-4a86f.firebaseapp.com",
  projectId: "actividades-4a86f",
  storageBucket: "actividades-4a86f.appspot.com",
  messagingSenderId: "76756459876",
  appId: "1:76756459876:web:a6ca3ad9fa64fa82fa9a71"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default {
  app,
  db,
  auth
};
