"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import getResourcePageVisibility from "@/firebase/db/resources/getResourcePageVisibility";
import getHackathonPageData from "@/firebase/db/resources/getHackathonPageData";
import { HackathonPageData } from "@/app/account/dashboard/page";

export const LayoutContext = createContext({});

export const useLayoutContext = () => useContext(LayoutContext);

interface LayoutContextProviderProps {
  children: ReactNode;
}

export function LayoutContextProvider({
  children,
}: LayoutContextProviderProps): JSX.Element {
  const [title, setTitle] = useState("Home");
  const [hackathonPageViewable, setHackathonPageViewable] = useState(false);
  const [hackathonPageData, setHackathonPageData] = useState<
    HackathonPageData | undefined
  >();

  useEffect(() => {
    getResourcePageVisibility().then((result: boolean) => {
      setHackathonPageViewable(result);
    });

    getHackathonPageData().then((result: string) => {
      let data: HackathonPageData = JSON.parse(result);

      setHackathonPageData(data);
    });
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        title,
        updateTitle: (newTitle: string) => {
          setTitle(newTitle);
        },
        hackathonPageViewable,
        updateHackathonPageViewable: (value: boolean) => {
          setHackathonPageViewable(value);
        },
        hackathonPageData,
        setHackathonPageData: (value: HackathonPageData) => {
          setHackathonPageData(value);
        },
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
