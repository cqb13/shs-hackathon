"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLayoutContext } from "@/lib/context/LayoutContext";
import useScroll from "@lib/hooks/useScroll";
import { useEffect } from "react";
import routes from "@lib/routes";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const { updateTitle } = useLayoutContext() as { updateTitle: (title: string) => void };

  useEffect(() => {
    const route = routes.find((route) => route.path === pathname);
    if (route) updateTitle(route.name);
    else updateTitle("Page Not Found");
  }, [pathname]);

  return (
    <nav
      className={`${
        useScroll(40)
          ? "shadow-bar bg-onyx bg-opacity-90 backdrop-blur-xl sticky top-0 w-11/12 m-auto rounded-b-lg"
          : "bg-onyx w-full rounded-none"
      }  flex items-center justify-between gap-2 max-xs:flex-col z-50 transition-all px-14 py-1`}
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
