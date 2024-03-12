"use client";

import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";
import deleteAccount from "@/utils/deleteAccount";
import userIsAdmin from "@/utils/userIsAdmin";
import { useAuthContext } from "@lib/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import userIsOwner from "@/utils/userIsOwner";
import Image from "next/image";

interface User {
  photoURL: string;
  isOwner: boolean;
  isAdmin: boolean;
  email: string;
  name: string;
  uid: string;
}

export default function HackathonResources() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

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

  return (
    <main className='bg-white'>
      {isAdmin ? (
        <section className='px-64 py-28 flex flex-col w-full gap-2 max-lg:px-20 max-md:px-10 max-xxs:px-5'>
          <h1 className='font-space-mono text-2xl text-black'>
            Hackathon Resource Management
          </h1>
          <div>
            <p className='font-space-mono text-xl text-black pl-2'>
              Name this hackathon.
            </p>
            <input
              type='text'
              placeholder='Hackathon Name'
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
              className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
            />
          </div>
          <div>
            <p className='font-space-mono text-xl text-black pl-2'>
              Wifi password
            </p>
            <input
              type='text'
              placeholder='Wifi Password'
              className='w-full rounded-md bg-onyx placeholder-gray text-fairy_tale-400 font-space-mono p-4'
            />
          </div>
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
                <h2 className='px-1'>{user.name}</h2>
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
