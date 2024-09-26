"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
