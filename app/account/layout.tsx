"use client";

import ConnectedButton from "@/components/general/connectedButton";
import { useAuthContext } from "@/lib/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AccountLayout({ children }: { children: any }) {
  const { user, isImportant, isAdmin } = useAuthContext() as {
    user: any;
    isImportant: boolean;
    isAdmin: boolean;
  };
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"account" | "dashboard">(
    "account",
  );

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]);

  const switchView = () => {
    if (currentView == "account") {
      setCurrentView("dashboard");
      router.push("/account/dashboard");
    } else {
      setCurrentView("account");
      router.push("/account");
    }
  };

  return (
    <main className="flex flex-col gap-2 items-center w-9/12 ml-auto mr-auto max-sm:w-11/12 p-4">
      {isImportant || isAdmin ? (
        <ConnectedButton
          onClickLeft={switchView}
          onClickRight={switchView}
          leftStyle="normal"
          rightStyle="normal"
          leftTitle="Account"
          rightTitle="Admin Dashboard"
          containerClassModifier="mb-2 w-full"
          leftClassModifier="w-full"
          rightClassModifier="w-full"
        />
      ) : null}
      {children}
    </main>
  );
}
