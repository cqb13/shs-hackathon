"use client";

import { getDoc, doc } from "firebase/firestore";
import userIsAdmin from "@/utils/userIsAdmin";
import { useAuthContext } from "@lib/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";

type HackathonResourceConfig = {
  visible: boolean;
  hackathonName: string;
  theme: string;
  themeDescription: string;
  exampleSubmissionLink: string;
  finalSubmissionLink: string;
  wifiName: string;
  wifiPassword: string;
};

export default function HackathonResources() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const [hackathonResourceConfig, setHackathonResourceConfig] =
    useState<HackathonResourceConfig>();

  useEffect(() => {
    getHackathonResourceConfig();
    if (user) {
      userIsAdmin(user).then((isAdmin) => {
        if (hackathonResourceConfig == null) return;
        if (!isAdmin && !hackathonResourceConfig.visible) {
          router.push("/");
        }
      });
    } else {
      if (hackathonResourceConfig == null) return;
      if (!hackathonResourceConfig.visible) {
        router.push("/");
      }
    }
  }, [user, hackathonResourceConfig]);

  const getHackathonResourceConfig = async () => {
    const configRef = doc(db, "config", "hackathon-resources");
    const configSnap = await getDoc(configRef);
    if (configSnap.exists()) {
      setHackathonResourceConfig(configSnap.data() as HackathonResourceConfig);
    } else {
      console.log("No such document!");
    }
  };

  const convertExampleSlideShowToCopyLink = () => {
    const exampleSubmissionLink =
      hackathonResourceConfig?.exampleSubmissionLink;
    if (!exampleSubmissionLink) return;
    const replaced = exampleSubmissionLink.replace(
      "/edit?usp=sharing",
      "/copy"
    );
    return replaced;
  };

  return (
    <main className='flex flex-col gap-10 px-60 py-20 max-lg:px-14 max-sm:px-5'>
      {hackathonResourceConfig ? (
        <>
          <h2 className='text-onyx-200 font-unica-one text-5xl'>
            Welcome to the {hackathonResourceConfig.hackathonName}!
          </h2>
          <h3 className='text-onyx-200 font-unica-one text-4xl' id='part-1'>
            Theme: {hackathonResourceConfig.theme}
          </h3>
          <article className='font-space-mono text-xl text-neutral-700'>
            {hackathonResourceConfig.themeDescription}
          </article>
          <div className='flex gap-2'>
            <button
              onClick={() =>
                window.open(hackathonResourceConfig.exampleSubmissionLink)
              }
              className='w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150'
            >
              View Example Submission Slideshow
            </button>
            <button
              onClick={() => window.open(convertExampleSlideShowToCopyLink())}
              className='w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150'
            >
              Copy Example Submission Slideshow
            </button>
          </div>
          <button
            onClick={() =>
              window.open(hackathonResourceConfig.finalSubmissionLink)
            }
            className='w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150'
          >
            Submit Final Project
          </button>
          <div>
            <h3 className='text-onyx-200 font-unica-one text-4xl' id='part-2'>
              WiFi Information
            </h3>
            <div className='font-space-mono text-xl text-neutral-700'>
              <p>Network Name: {hackathonResourceConfig.wifiName}</p>
              <p>Password: {hackathonResourceConfig.wifiPassword}</p>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
