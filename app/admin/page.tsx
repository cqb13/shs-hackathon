"use client";

import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";
import userIsAdmin from "@/utils/userIsAdmin";
import { useAuthContext } from "@lib/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import userIsOwner from "@/utils/userIsOwner";

interface User {
  photoURL: string;
  isOwner: boolean;
  isAdmin: boolean;
  email: string;
  name: string;
  uid: string;
}

type HackathonResourceConfig = {
  visible: boolean;
  hackathonName: string;
  theme: string;
  themeDescription: string;
  exampleSubmissionLink: string;
  finalSubmissionLink: string;
  wifiName: string;
  wifiPassword: string;
};

export default function HackathonResources() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [hackathonResourceConfig, setHackathonResourceConfig] =
    useState<HackathonResourceConfig>();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      userIsAdmin(auth.currentUser).then((isAdmin) => {
        if (isAdmin) {
          setIsAdmin(true);
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
        }
      });

      userIsOwner(auth.currentUser).then((isOwner) => {
        if (isOwner) {
          setIsOwner(true);
        }
      });

      userIsAdmin(auth.currentUser).then((isAdmin) => {
        if (isAdmin) {
          setIsAdmin(true);
        }
      });

      getHackathonResourceConfig();
    }
  }, [user, router]);

  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);

  const updateUsersAdminStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid || (user.isAdmin && !isOwner)) {
      return;
    }

    const updatedUserList = userList.map((u) => {
      if (u.uid === user.uid) {
        if (u.isOwner) {
          return u;
        }
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
        isAdmin: newAdminStatus
      },
      { merge: true }
    ).catch((error) => {
      console.error("Error writing document: ", error);
    });
  };

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredUsers = userList.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredUserList(filteredUsers);
  };

  const getHackathonResourceConfig = async () => {
    const configRef = doc(db, "config", "hackathon-resources");
    const configSnap = await getDoc(configRef);
    if (configSnap.exists()) {
      setHackathonResourceConfig(configSnap.data() as HackathonResourceConfig);
    } else {
      console.log("No such document!");
    }
  };

  const updateHackathonResourceConfig = async () => {
    const configRef = doc(db, "config", "hackathon-resources");
    await setDoc(configRef, hackathonResourceConfig);
  };

  const updateHackathonResourceConfigVisible = () => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      visible: !hackathonResourceConfig.visible
    });
  };

  const updateHackathonResourceConfigHackathonName = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      hackathonName: event.target.value
    });
  };

  const updateHackathonResourceConfigTheme = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      theme: event.target.value
    });
  };

  const updateHackathonResourceConfigThemeDescription = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      themeDescription: event.target.value
    });
  };

  const updateHackathonResourceConfigExampleSubmissionLink = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      exampleSubmissionLink: event.target.value
    });
  };

  const updateHackathonResourceConfigFinalSubmissionLink = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      finalSubmissionLink: event.target.value
    });
  };

  const updateHackathonResourceConfigWifiName = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      wifiName: event.target.value
    });
  };

  const updateHackathonResourceConfigWifiPassword = (event: any) => {
    if (hackathonResourceConfig == null) {
      return;
    }
    setHackathonResourceConfig({
      ...hackathonResourceConfig,
      wifiPassword: event.target.value
    });
  };

  return (
    <main className='bg-white'>
      {isAdmin ? (
        <section className='px-64 py-28 flex flex-col w-full gap-2 max-lg:px-20 max-md:px-10 max-xxs:px-5'>
          <h1 className='font-space-mono text-2xl text-black'>
            Hackathon Resource Management
          </h1>
          <section className='flex flex-col gap-2'>
            <button
              onClick={updateHackathonResourceConfigVisible}
              className='w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150'
            >
              {hackathonResourceConfig?.visible
                ? "Hide Hackathon Resource"
                : "Show Hackathon Resource"}
            </button>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                Name this hackathon.
              </p>
              <input
                type='text'
                placeholder='Hackathon Name'
                value={hackathonResourceConfig?.hackathonName}
                onChange={updateHackathonResourceConfigHackathonName}
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
              />
            </div>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                What is the theme?
              </p>
              <input
                type='text'
                placeholder='Theme'
                value={hackathonResourceConfig?.theme}
                onChange={updateHackathonResourceConfigTheme}
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
              />
            </div>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                A short description of the theme.
              </p>
              <textarea
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
                placeholder='Description of theme'
                value={hackathonResourceConfig?.themeDescription}
                onChange={updateHackathonResourceConfigThemeDescription}
                cols={30}
                rows={10}
              />
            </div>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                Example submission google slide link.
              </p>
              <input
                type='text'
                placeholder='Google Slide Link'
                value={hackathonResourceConfig?.exampleSubmissionLink}
                onChange={updateHackathonResourceConfigExampleSubmissionLink}
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
              />
            </div>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                Final submission google form link.
              </p>
              <input
                type='text'
                placeholder='Google Form Link'
                value={hackathonResourceConfig?.finalSubmissionLink}
                onChange={updateHackathonResourceConfigFinalSubmissionLink}
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
              />
            </div>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                Wifi name.
              </p>
              <input
                type='text'
                placeholder='Wifi Name'
                value={hackathonResourceConfig?.wifiName}
                onChange={updateHackathonResourceConfigWifiName}
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
              />
            </div>
            <div>
              <p className='font-space-mono text-xl text-black pl-2'>
                Wifi password.
              </p>
              <input
                type='text'
                placeholder='Wifi Password'
                value={hackathonResourceConfig?.wifiPassword}
                onChange={updateHackathonResourceConfigWifiPassword}
                className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
              />
            </div>
            <button
              onClick={updateHackathonResourceConfig}
              className='w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150'
            >
              Save
            </button>
          </section>
        </section>
      ) : null}
      {isAdmin ? (
        <section className='px-64 py-28 flex flex-col w-full gap-2 max-lg:px-20 max-md:px-10 max-xxs:px-5'>
          <h1 className='font-space-mono text-2xl text-black'>
            User Management
          </h1>
          <input
            type='text'
            placeholder='Search Users'
            className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
            onChange={searchUsers}
          />
          <div className='flex flex-col gap-2 mt-2 overflow-y-scroll h-72'>
            {filteredUserList.map((user: any) => (
              <div
                key={user.uid}
                className='w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4'
              >
                <h2 className='px-1'>
                  {user.name} {user.isOwner ? " (Owner!)" : ""}
                </h2>
                <p className='px-1'>{user.email}</p>
                <p className='px-1'>{user.isAdmin ? "Admin" : "Not Admin"}</p>
                <>
                  {isOwner ? (
                    <button
                      onClick={() => updateUsersAdminStatus(user)}
                      className='px-1 rounded-md hover:bg-light active:tracking-wider transition-all ease-in-out bg-onyx-600'
                    >
                      {user.isAdmin ? "Remove Admin" : "Add Admin"}
                    </button>
                  ) : null}
                </>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
