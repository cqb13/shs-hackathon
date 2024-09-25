"use client";

import { useLayoutContext } from "@/lib/context/LayoutContext";
import { useAuthContext } from "@/lib/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import googleSignIn from "@/firebase/auth/googleSignIn";
import createUserDoc from "@/firebase/db/users/createUser";
import signOutUser from "@/firebase/auth/signOut";
import useScroll from "@lib/hooks/useScroll";
import { useEffect } from "react";
import routes from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext() as { user: any };

  const { updateTitle } = useLayoutContext() as {
    updateTitle: (title: string) => void;
  };

  useEffect(() => {
    const route = routes.find((route) => route.path === pathname);
    if (route) updateTitle(route.name);
    else updateTitle("Page Not Found");
  }, [pathname]);

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/");
  };

  const findVisibility = (
    signedIn: boolean,
    signedOut: boolean,
    admin: boolean,
  ) => {
    if (signedOut) return true;
    if (signedIn && !signedOut && user) return true;
    if (!signedIn && signedOut && !user) return true;
    return false;
  };

  const handleSignIn = async () => {
    const result = await googleSignIn();

    if (result.status == "success") {
      let user = result.user;

      if (!user) {
        return;
      }

      await createUserDoc(user);
    } else {
      console.log(result.message);
    }
  };

  return (
    <nav
      className={`${
        useScroll(40)
          ? "shadow-bar bg-onyx bg-opacity-90 backdrop-blur-xl sticky top-0 w-11/12 m-auto rounded-b-lg"
          : "bg-onyx w-full rounded-none"
      }  flex items-center justify-between gap-2 max-sm:flex-col z-30 transition-all px-14 py-1`}
    >
      <p className="p-1 text-fairy_tale font-space-mono">SHS Hackathon</p>
      <div className="flex items-center gap-2 max-sm:flex-wrap max-sm:justify-center">
        {routes.map((route) => (
          <button
            type="button"
            key={route.name}
            onClick={() => router.push(route.path)}
            className={`${
              pathname === route.path ? " text-fairy_tale-400" : ""
            } rounded p-1 text-fairy_tale ${findVisibility(route.signedIn, route.signedOut, route.admin) ? "" : "hidden"}`}
          >
            {route.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => router.push("/#contact")}
          className="rounded p-1 text-fairy_tale"
        >
          Contact
        </button>
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="text-fairy_tale rounded p-1"
          >
            Sign Out
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSignIn}
            className="text-fairy_tale rounded p-1"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
