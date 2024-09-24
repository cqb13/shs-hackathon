"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import getRoles from "@/firebase/db/users/getUserRoles";
import { firebase_app } from "@/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isImportant, setIsImportant] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHelper, setIsHelper] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        getRoles(user).then(
          (roles: {
            isImportant: boolean;
            isAdmin: boolean;
            isHelper: boolean;
          }) => {
            setIsImportant(roles.isImportant);
            setIsAdmin(roles.isAdmin);
            setIsHelper(roles.isHelper);
          },
        );
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, loading, isImportant, isAdmin, isHelper }}
    >
      {children}
    </AuthContext.Provider>
  );
}
