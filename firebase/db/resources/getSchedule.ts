import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function getSchedule(): Promise<string> {
  const settingsRef = doc(db, "settings", "general");
  const settingsDoc = await getDoc(settingsRef);
  if (settingsDoc.exists()) {
    const settingsData = settingsDoc.data();

    return settingsData.schedule;
  } else {
    return "fail";
  }
}
