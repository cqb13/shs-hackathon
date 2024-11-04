import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function updateEventDetails(day: string, link: string) {
  const settingsRef = doc(db, "settings", "general");
  setDoc(
    settingsRef,
    { eventDay: day, signUpLink: link },
    { merge: true },
  ).catch((error) => {
    console.log(error);
  });
}
