"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export const LayoutContext = createContext({});

export const useLayoutContext = () => useContext(LayoutContext);

interface LayoutContextProviderProps {
  children: ReactNode;
}

export function LayoutContextProvider({
  children
}: LayoutContextProviderProps): JSX.Element {
  const [title, setTitle] = useState("Home");

  return (
    <LayoutContext.Provider
      value={{
        title,
        updateTitle: (newTitle: string) => {
          setTitle(newTitle);
        }
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
