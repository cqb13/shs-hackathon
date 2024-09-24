"use client";

import setResourcePageVisibility from "@/firebase/db/resources/updateResourcePageVisibility";
import getResourcePageVisibility from "@/firebase/db/resources/getResourcePageVisibility";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useLayoutContext } from "@/lib/context/LayoutContext";
import Notification from "@/components/general/Notification";
import { useAuthContext } from "@/lib/context/authContext";
import TextInput from "@/components/general/TextInput";
import Button from "@/components/general/Button";
import { auth, db } from "@/firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  isImportant: boolean;
  isAdmin: boolean;
  isHelper: boolean;
  email: string;
  name: string;
  uid: string;
}

export default function Account() {
  const router = useRouter();
  const { user, isImportant, isAdmin } = useAuthContext() as {
    user: any;
    isImportant: boolean;
    isAdmin: boolean;
  };
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);

  const [searchTerm, setSearchTerm] = useState("");

  const [hackathonResourcePageVisible, setHackathonResourcePageVisible] =
    useState(false);

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const { updateTitle } = useLayoutContext() as {
    updateTitle: (title: string) => void;
  };

  useEffect(() => {
    updateTitle("Admin Dashboard");
  }, []);

  const triggerNotification = (
    title: string,
    type: "success" | "error",
    message: string,
  ) => {
    setNotification(true);
    setNotificationTitle(title);
    setNotificationType(type);
    setNotificationMessage(message);
  };

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      if (!isImportant && !isAdmin) {
        router.push("/");
        return;
      }

      const users = collection(db, "users");
      getDocs(users)
        .then((querySnapshot) => {
          const data: any = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setUserList(data);
          setFilteredUserList(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      getResourcePageVisibility().then((status: boolean) => {
        setResourcePageVisibility(status);
      });
    }
  }, [user, isImportant, isAdmin, router]);

  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);

  //!!! this does not refer to the resource page with all the tutorials on it
  //!!! as I was doing a bit of refactoring i realized calling the page the hackathon page instead of the hackathon resource page was a better idea
  //!!! I could not be bothered to change the name of all the vars though
  const toggleResourcePageVisibility = () => {
    setResourcePageVisibility(!hackathonResourcePageVisible).then(() => {
      setHackathonResourcePageVisible(!hackathonResourcePageVisible);
      triggerNotification(
        "Updated visibility",
        "success",
        "You wont see any changes on your end.",
      );
    });
  };

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    let search = event.target.value;
    const filteredUsers = userList.filter((user) => {
      return (
        user.email.toLowerCase().includes(search) ||
        user.name.toLowerCase().includes(search)
      );
    });
    setFilteredUserList(filteredUsers);
  };

  const updateUsersHelperStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid) {
      triggerNotification(
        "Failed to update helper",
        "error",
        "You can't change your own status",
      );
      return;
    }

    if (user.isImportant) {
      triggerNotification(
        "Failed to update helper",
        "error",
        "You cant change this users roles",
      );
      return;
    }

    const updatedUserList = userList.map((u) => {
      if (u.uid === user.uid) {
        return { ...u, isHelper: !u.isHelper };
      }
      return u;
    });

    setUserList(updatedUserList);

    const userRef = doc(db, "users", user.uid);
    const newHelperStatus = !user.isHelper;
    setDoc(
      userRef,
      {
        isHelper: newHelperStatus,
      },
      { merge: true },
    ).catch((error) => {
      console.log(error);
      triggerNotification("Failed to update helper", "error", "Unknown error");
    });
  };

  const updateUsersAdminStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid) {
      triggerNotification(
        "Failed to update admin",
        "error",
        "You can't change your own status",
      );
      return;
    }

    if (user.isImportant) {
      triggerNotification(
        "Failed to update admin",
        "error",
        "This user is Important",
      );
      return;
    }

    const updatedUserList = userList.map((u) => {
      if (u.uid === user.uid) {
        return { ...u, isAdmin: !u.isAdmin };
      }
      return u;
    });

    setUserList(updatedUserList);

    const userRef = doc(db, "users", user.uid);
    const newAdminStatus = !user.isAdmin;
    setDoc(
      userRef,
      {
        isAdmin: newAdminStatus,
      },
      { merge: true },
    ).catch((error) => {
      console.log(error);
      triggerNotification("Failed to update admin", "error", "Unknown error");
    });
  };

  return (
    <>
      {isAdmin ? (
        <>
          <h1 className="text-xl font-bold font-heading text-onyx-200">
            User Management
          </h1>
          <TextInput
            value={searchTerm}
            onChange={searchUsers}
            placeholder="Search Users"
            customClass="w-full"
          />
          <section className="w-full h-[35rem] rounded-xl overflow-y-scroll">
            <div className="grid grid-cols-3 gap-2 mt-2 overflow-y-scroll w-full items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
              {filteredUserList.map((user: any) => (
                <div
                  key={user.uid}
                  className="border-t-2 border-fairy_tale hover:border-t-4 rounded-t-lg rounded-b-lg bg-onyx p-2 rounded-none h-56 transition-all duration-200 ease-in-out flex flex-col justify-between"
                >
                  <div>
                    <h2 className="px-1">{user.name}</h2>
                    <p className="px-1">{user.email}</p>
                  </div>
                  <section className="flex w-full gap-2 mt-2">
                    {isAdmin || isImportant ? (
                      <div className="w-full">
                        <p className="bg-fairy_tale text-onyx text-center p-1 rounded-t">
                          {user.isHelper ? "Helper" : "Not Helper"}
                        </p>
                        <Button
                          onClick={() => updateUsersHelperStatus(user)}
                          title={user.isHelper ? "Remove" : "Add"}
                          style={user.isHelper ? "red" : "green"}
                          classModifier="rounded-t-none rounded-b !p-1 w-full"
                        />
                      </div>
                    ) : null}
                    {isAdmin || isImportant ? (
                      <div className="w-full">
                        <p className="bg-fairy_tale text-onyx text-center p-1 rounded-tl-lg rounded-tr-lg">
                          {user.isAdmin ? "Admin" : "Not Admin"}
                        </p>
                        <Button
                          onClick={() => updateUsersAdminStatus(user)}
                          title={user.isAdmin ? "Remove" : "Add"}
                          style={user.isAdmin ? "red" : "green"}
                          classModifier="rounded-t-none rounded-b !p-1 w-full"
                        />
                      </div>
                    ) : null}
                  </section>
                </div>
              ))}
            </div>
          </section>
          <div className="text-neutral-700 font-space-mono">
            <h2 className="text-xl text-onyx-200 font-bold">
              Change Hackathon Page Visibility
            </h2>
            <p className="font-space-mono text-neutral-700">
              If checked, allows all users to view the hackathon theme and other
              event details
            </p>
            <div className="flex gap-2 items-center mt-2">
              <div
                onClick={toggleResourcePageVisibility}
                className={`rounded border border-fairy_tale hover:border-fairy_tale-300 w-9 h-9 ${hackathonResourcePageVisible ? "bg-fairy_tale" : ""} cursor-pointer transition-all duration-150 ease-in-out`}
              ></div>
              <p>Hackathon Page Visibility</p>
            </div>
          </div>
        </>
      ) : null}
      {notification ? (
        <Notification
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={(value) => setNotification(value)}
        />
      ) : null}
    </>
  );
}
