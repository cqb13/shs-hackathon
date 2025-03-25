"use client";

import { useLayoutContext } from "@/lib/context/LayoutContext";
import { HackathonPageData } from "../account/dashboard/page";
import { useAuthContext } from "@/lib/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HackathonResources() {
  const router = useRouter();
  const { hackathonPageViewable, fetchHackathonPageData } =
    useLayoutContext() as {
      hackathonPageViewable: boolean;
      hackathonPageData: HackathonPageData;
      fetchHackathonPageData: () => Promise<HackathonPageData>;
    };
  const { user, isImportant, isAdmin, isHelper } = useAuthContext() as {
    user: any;
    isImportant: boolean;
    isAdmin: boolean;
    isHelper: boolean;
  };
  const [theme, setTheme] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [wifiNetworkName, setWifiNetworkName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  useEffect(() => {
    if (
      hackathonPageViewable == false &&
      isHelper == false &&
      isAdmin == false &&
      isImportant == false
    ) {
      return;
    }

    fetchHackathonPageData().then((data) => {
      if (!data) {
        return;
      }

      setTheme(data.theme);
      setThemeDescription(data.themeDescription);
      setWifiNetworkName(data.wifiNetworkName);
      setWifiPassword(data.wifiPassword);
    });
  }, [hackathonPageViewable, user, isHelper, isAdmin, isImportant]);

  useEffect(() => {
    if (
      hackathonPageViewable == false &&
      isHelper == false &&
      isAdmin == false &&
      isImportant == false
    ) {
      router.push("/");
      return;
    }
  }, [hackathonPageViewable, user, isHelper, isAdmin, isImportant]);

  return (
    <main className="flex flex-col gap-10 px-60 py-20 max-lg:px-14 max-sm:px-5 bg-white">
      <h2 className="text-onyx-200 font-body text-5xl">
        Welcome to the 7th Annual SHS Hackathon!
      </h2>
      <h3 className="text-onyx-200 font-body text-4xl" id="part-1">
        {`Theme: ${theme}`}
      </h3>
      <article className="font-body text-xl text-neutral-700">
        {themeDescription}
      </article>
      <a
        href="https://docs.google.com/presentation/d/11Tqa2bk9oJfrFPfz_28DYP7E7fiLAkFgSC_Vm-_uTZM/edit?usp=sharing"
        target="_bank"
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
      >
        Opening Slides
      </a>
      <button
        onClick={() => router.push("/hackathon/examples")}
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Example Projects
      </button>
      <a
        href="https://docs.google.com/document/d/1NPmzoyoBm2CM8a9TIZI739GXTnNDBgrCLKxOG0fDu24/edit?usp=sharing"
        target="_bank"
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
      >
        Done Early?
      </a>
      <a
        href="https://docs.google.com/document/d/12afB3Qw7lEzojcw3uPRCmsFLvIazlqc6b3YyGocejwI/edit?usp=sharing"
        target="_bank"
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
      >
        Rubric
      </a>
      <div className="flex gap-2">
        <a
          href="https://docs.google.com/presentation/d/1nlsooeK3z3J6DPyLEgatEinUvGxJ2TDhnXSIJfM-kWQ/edit?usp=sharing"
          target="_bank"
          className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
        >
          View Submission Template Slideshow
        </a>
        <a
          href="https://docs.google.com/presentation/d/1nlsooeK3z3J6DPyLEgatEinUvGxJ2TDhnXSIJfM-kWQ/copy"
          target="_bank"
          className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
        >
          Copy Submission Template Slideshow
        </a>
      </div>
      <a
        href="https://forms.gle/tVmNVwtnEcQNL4wSA"
        target="_bank"
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
      >
        Submit Project
      </a>
      <a
        href="https://forms.gle/EjRuikpk6RxynDdc7"
        target="_bank"
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
      >
        Feedback Form
      </a>
      <a
        href="https://problems.shsdevs.com"
        target="_bank"
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-body p-4 hover:bg-onyx-400 transition-all duration-150 text-center"
      >
        Coding Challenges
      </a>
      <div>
        <h3 className="text-onyx-200 font-body text-4xl" id="part-2">
          WiFi Information
        </h3>
        <div className="font-body text-xl text-neutral-700">
          <p>Network Name: {wifiNetworkName}</p>
          <p>Password: {wifiPassword}</p>
        </div>
      </div>
    </main>
  );
}
