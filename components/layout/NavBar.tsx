"use client";

import { useLayoutContext } from "@/lib/context/LayoutContext";
import { useRouter, usePathname } from "next/navigation";
import useScroll from "@lib/hooks/useScroll";
import { useEffect, useState } from "react";
import routes from "@lib/routes";
import { auth, db } from "@lib/firebase";
import { useAuthContext } from "@lib/context/authContext";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import userIsAdmin from "@/utils/userIsAdmin";
import googleSignIn from "@/utils/googleSignIn";
import googleSignOut from "@/utils/googleSignOut";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const { updateTitle } = useLayoutContext() as {
    updateTitle: (title: string) => void;
  };
  const { user } = useAuthContext() as { user: any };
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const route = routes.find((route) => route.path === pathname);
    if (route) updateTitle(route.name);
    else updateTitle("Page Not Found");
  }, [pathname]);

  useEffect(() => {
    if (user) {
      userIsAdmin(user).then((isAdmin) => {
        setIsAdmin(isAdmin);
      });
    }
  }, [user]);

  const accountStatusToggle = () => {
    if (user) {
      googleSignOut();
      router.push("/");
    } else {
      googleSignIn().then((user) => {
        if (!auth.currentUser) return;

        const users = collection(db, "users");
        const userRef = doc(users, user.uid);

        getDoc(userRef)
          .then((userDoc) => {
            if (!userDoc.exists()) {
              setDoc(userRef, {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                dateCreated: Date.now(),
                lastLogin: Date.now(),
                isAdmin: false
              });
            } else {
              setDoc(
                userRef,
                {
                  lastLogin: Date.now()
                },
                { merge: true }
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  };

  return (
    <nav
      className={`${
        useScroll(40)
          ? "shadow-bar bg-onyx bg-opacity-90 backdrop-blur-xl sticky top-0 w-11/12 m-auto rounded-b-lg"
          : "bg-onyx w-full rounded-none"
      }  flex items-center justify-between gap-2 max-xs:flex-col z-30 transition-all px-14 py-1`}
    >
      <p className='p-1 text-fairy_tale font-space-mono'>SHS Hackathon</p>
      <div className='flex items-center gap-2'>
        {routes.map((route) => (
          <>
            {(user && route.signedIn && !route.admin) ||
            (!user && route.signedOut) ||
            (user && route.admin && isAdmin) ? (
              <button
                type='button'
                key={route.name}
                onClick={() => router.push(route.path)}
                className={`${
                  pathname === route.path ? " text-fairy_tale-400" : ""
                } rounded p-1 text-fairy_tale`}
              >
                {route.name}
              </button>
            ) : null}
          </>
        ))}
        <button
          onClick={accountStatusToggle}
          className='rounded p-1 text-fairy_tale'
        >
          {user ? "Sign Out" : "Sign In"}
        </button>
        <button
          type='button'
          onClick={() => router.push("/#contact")}
          className='rounded p-1 text-fairy_tale'
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
