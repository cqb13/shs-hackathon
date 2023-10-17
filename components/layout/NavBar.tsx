"use client";

//import { useAuthContext } from "@/lib/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import useScroll from "@lib/hooks/useScroll";
import routes from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  //const { user } = useAuthContext() as { user: any };

  //const findVisibility = (signedIn: boolean, signedOut: boolean) => {
  //  if (signedIn && signedOut) return true;
  //  if (signedIn && !signedOut && user) return true;
  //  if (!signedIn && signedOut && !user) return true;
  //  return false;
  //};

  //const handleSignOut = async () => {
  //  await signOutUser();
  //  router.push("/");
  //};

  //!!!: (add the following to class of route button when accounts) findVisibility(route.signedIn, route.signedOut) ? "" : "hidden"

  /*!!!: Add un nav when accounts
          {user && (
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded p-1 text-primary"
          >
            Sign Out
          </button>
        )}
   */

  return (
    <nav
      className={`${
        useScroll(0.0001) ? "shadow-bar backdrop-blur-sm sticky top-0" : ""
      }
        : ""} flex items-center justify-between gap-2 max-xs:flex-col z-50 transition-all w-11/12 m-auto rounded-b-lg px-14 py-1`}
    >
      <p className="p-1 text-fairy_tale font-space-mono">SHS Hackathon</p>
      <div className="flex items-center gap-2">
        {routes.map((route) => (
          <button
            type="button"
            key={route.name}
            onClick={() => router.push(route.path)}
            className={`${
              pathname === route.path ? " text-fairy_tale-400" : ""
            } rounded p-1 text-fairy_tale`}
          >
            {route.name}
          </button>
        ))}
      </div>
    </nav>
  );
}