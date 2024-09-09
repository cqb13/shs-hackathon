import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaZefd7zvXHlNAuMYMjRm8C2sIw8fLlqQ",
  authDomain: "shs-hackathon-website.firebaseapp.com",
  projectId: "shs-hackathon-website",
  storageBucket: "shs-hackathon-website.appspot.com",
  messagingSenderId: "391633031751",
  appId: "1:391633031751:web:76dbbaa89d44a49950d762",
  measurementId: "G-5LVB9MQHRP",
};

const app = initializeApp(firebaseConfig);
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, firebase_app };
