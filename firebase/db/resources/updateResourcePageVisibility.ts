import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function setResourcePageVisibility(value: boolean) {
  const settingsRef = doc(db, "settings", "general");
  setDoc(settingsRef, { resourcePageVisible: value }, { merge: true }).catch(
    (error) => {
      console.log(error);
    },
  );
}
