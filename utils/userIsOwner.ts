import { getDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function userIsOwner(user: any) {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();

    if (userData.isOwner) {
      return userData.isOwner;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
