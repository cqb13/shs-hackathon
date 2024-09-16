import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function getRoles(user: any) {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const isImportant = userData.isImportant;
    const isAdmin = userData.isAdmin;
    const isHelper = userData.isHelper;

    return { isImportant: isImportant, isAdmin: isAdmin, isHelper: isHelper };
  } else {
    return { isImportant: false, isAdmin: false, isHelper: false };
  }
}
