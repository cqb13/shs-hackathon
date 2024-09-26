"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import getResourcePageVisibility from "@/firebase/db/resources/getResourcePageVisibility";

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

  useEffect(() => {
    getResourcePageVisibility().then((result: boolean) => {
      setHackathonPageViewable(result);
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
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
