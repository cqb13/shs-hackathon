"use client";

import { useRouter, usePathname } from "next/navigation";
import useScroll from "@lib/hooks/useScroll";
import routes from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className={`${
        useScroll(0.0001)
          ? "shadow-bar bg-onyx bg-opacity-40 backdrop-blur-xl sticky top-0"
          : ""
      }
        : ""} flex items-center justify-between gap-2 max-xs:flex-col z-50 transition-all w-11/12 m-auto rounded-b-lg px-14 py-1`}
    >
      <p className='p-1 text-fairy_tale font-space-mono'>SHS Hackathon</p>
      <div className='flex items-center gap-2'>
        {routes.map((route) => (
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
        ))}
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
