import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function getHackathonPageData(): Promise<string> {
  const settingsRef = doc(db, "settings", "general");
  const settingsDoc = await getDoc(settingsRef);
  if (settingsDoc.exists()) {
    const settingsData = settingsDoc.data();

    return settingsData.hackathonPageData;
  } else {
    return "fail";
  }
}
