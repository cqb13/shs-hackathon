import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0iL8AAdwuc5V04HooTIQzBhpEhwDkFB8",
  authDomain: "shs-hackathon.firebaseapp.com",
  projectId: "shs-hackathon",
  storageBucket: "shs-hackathon.appspot.com",
  messagingSenderId: "1004061078895",
  appId: "1:1004061078895:web:f88c4e8835bdbc80e4649a",
  measurementId: "G-RM0776FXGL"
};

const app = initializeApp(firebaseConfig);
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, firebase_app };
