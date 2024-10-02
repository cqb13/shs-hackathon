import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function updateHackathonPageData(value: string) {
  const settingsRef = doc(db, "settings", "general");
  setDoc(settingsRef, { hackathonPageData: value }, { merge: true }).catch(
    (error) => {
      console.log(error);
    },
  );
}
