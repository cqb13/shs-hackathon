import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export type EventDetials = {
  eventDay: string;
  signUpLink: string;
};
export default async function getEventDetails(): Promise<EventDetials> {
  const settingsRef = doc(db, "settings", "general");
  const settingsDoc = await getDoc(settingsRef);

  let details: EventDetials = {
    eventDay: "",
    signUpLink: "",
  };

  if (settingsDoc.exists()) {
    const settingsData = settingsDoc.data();

    details.eventDay = settingsData.eventDay;
    details.signUpLink = settingsData.signUpLink;

    return details;
  }

  return details;
}
