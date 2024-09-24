"use client";

import ConnectedButton from "@/components/general/connectedButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AccountLayout({ children }: { children: any }) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<"account" | "dashboard">(
    "account",
  );

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
      {children}
    </main>
  );
}
