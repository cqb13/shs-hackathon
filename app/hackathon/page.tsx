"use client";

import { useLayoutContext } from "@/lib/context/LayoutContext";
import { HackathonPageData } from "../account/dashboard/page";
import { useAuthContext } from "@/lib/context/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HackathonResources() {
  const router = useRouter();
  const { hackathonPageViewable, hackathonPageData } = useLayoutContext() as {
    hackathonPageViewable: boolean;
    hackathonPageData: HackathonPageData;
  };
  const { user, isImportant, isAdmin, isHelper } = useAuthContext() as {
    user: any;
    isImportant: boolean;
    isAdmin: boolean;
    isHelper: boolean;
  };
  const [theme, setTheme] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [exampleSubmissionSlidesLink, setExampleSubmissionSlidesLink] =
    useState("");
  const [copyExampleSubmissionSlidesLink, setCopyExampleSubmissionSlidesLink] =
    useState("");
  const [rubricLink, setRubricLink] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [feedbackFormLink, setFeedbackFormLink] = useState("");
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

    if (hackathonPageData == undefined) {
      return;
    }

    setTheme(hackathonPageData.theme);
    setThemeDescription(hackathonPageData.themeDescription);
    setExampleSubmissionSlidesLink(
      hackathonPageData.exampleSubmissionSlidesLink,
    );
    setCopyExampleSubmissionSlidesLink(
      hackathonPageData.copyExampleSubmissionSlidesLink,
    );
    setRubricLink(hackathonPageData.rubricLink);
    setSubmissionLink(hackathonPageData.submissionLink);
    setFeedbackFormLink(hackathonPageData.feedbackFormLink);
    setWifiNetworkName(hackathonPageData.wifiNetworkName);
    setWifiPassword(hackathonPageData.wifiPassword);
  }, [
    hackathonPageData,
    hackathonPageViewable,
    user,
    isHelper,
    isAdmin,
    isImportant,
  ]);

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
    <main className="flex flex-col gap-10 px-60 py-20 max-lg:px-14 max-sm:px-5">
      <h2 className="text-onyx-200 font-space-mono text-5xl">
        Welcome to the 7th Annual SHS Hackathon!
      </h2>
      <h3 className="text-onyx-200 font-space-mono text-4xl" id="part-1">
        {`Theme: ${theme}`}
      </h3>
      <article className="font-space-mono text-xl text-neutral-700">
        {themeDescription}
      </article>
      <div className="flex gap-2">
        <button
          onClick={() => window.open(exampleSubmissionSlidesLink)}
          className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
        >
          View Example Submission Slideshow
        </button>
        <button
          onClick={() => window.open(copyExampleSubmissionSlidesLink)}
          className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
        >
          Copy Example Submission Slideshow
        </button>
      </div>
      <button
        onClick={() => window.open(rubricLink)}
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Rubric
      </button>
      <button
        onClick={() => window.open(submissionLink)}
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Submit Final Project
      </button>
      <button
        onClick={() => window.open(feedbackFormLink)}
        className="w-full rounded-md bg-onyx text-fairy_tale-400 font-space-mono p-4 hover:bg-onyx-400 transition-all duration-150"
      >
        Feedback Form
      </button>
      <div>
        <h3 className="text-onyx-200 font-space-mono text-4xl" id="part-2">
          WiFi Information
        </h3>
        <div className="font-space-mono text-xl text-neutral-700">
          <p>Network Name: {wifiNetworkName}</p>
          <p>Password: {wifiPassword}</p>
        </div>
      </div>
    </main>
  );
}
