import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function updateSchedule(value: string) {
  const settingsRef = doc(db, "settings", "general");
  setDoc(settingsRef, { schedule: value }, { merge: true }).catch((error) => {
    console.log(error);
  });
}
