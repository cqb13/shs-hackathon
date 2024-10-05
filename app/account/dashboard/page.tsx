"use client";

import setResourcePageVisibility from "@/firebase/db/resources/updateResourcePageVisibility";
import updateHackathonPageData from "@/firebase/db/resources/updateHackathonPage";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import updateSchedule from "@/firebase/db/resources/updateSchedule";
import { useLayoutContext } from "@/lib/context/LayoutContext";
import Notification from "@/components/general/Notification";
import { useAuthContext } from "@/lib/context/authContext";
import TextInput from "@/components/general/TextInput";
import TextArea from "@/components/general/TextArea";
import Button from "@/components/general/Button";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  isImportant: boolean;
  isAdmin: boolean;
  isHelper: boolean;
  email: string;
  name: string;
  uid: string;
}

export type EventScheduleItem = {
  name: string;
  time: string;
};

export type Sponsor = {
  name: string;
  websiteLink: string;
  imageLink: string;
};

export type HackathonPageData = {
  theme: string;
  themeDescription: string;
  exampleSubmissionSlidesLink: string;
  copyExampleSubmissionSlidesLink: string;
  rubricLink: string;
  submissionLink: string;
  feedbackFormLink: string;
  wifiNetworkName: string;
  wifiPassword: string;
};

export default function Account() {
  const router = useRouter();
  const { user, isImportant, isAdmin } = useAuthContext() as {
    user: any;
    isImportant: boolean;
    isAdmin: boolean;
  };
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);

  const [searchTerm, setSearchTerm] = useState("");

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<
    "success" | "warning" | "error"
  >("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const [addingScheduleItem, setAddingScheduleItem] = useState(false);
  const [edditingScheduleItem, setEditingScheduleItem] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [scheduleItemName, setScheduleItemName] = useState("");
  const [scheduleItemTime, setScheduleItemTime] = useState("");
  const [addingSponsor, setAddingSponsor] = useState(false);
  const [ableToPublishEvents, setAbleToPublishEvents] = useState(false);

  // event details
  const [eventIsSet, setEventIsSet] = useState(false);
  const [eventDay, setEventDay] = useState("");
  const [signUpLink, setSignUpLink] = useState("");
  const [eventSchedule, setEventSchedule] = useState<EventScheduleItem[]>([]);
  const [eventSponsors, setEventSponsors] = useState<Sponsor[]>([]);

  // hackathon page details
  const [theme, setTheme] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [exampleSubmissionSlidesLink, setExampleSubmissionSlidesLink] =
    useState("");
  const [rubricLink, setRubricLink] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [feedbackFormLink, setFeedbackFormLink] = useState("");
  const [wifiNetworkName, setWifiNetworkName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  const {
    updateTitle,
    hackathonPageViewable,
    updateHackathonPageViewable,
    hackathonPageData,
    setHackathonPageData,
  } = useLayoutContext() as {
    updateTitle: (title: string) => void;
    hackathonPageViewable: boolean;
    updateHackathonPageViewable: (value: boolean) => void;
    hackathonPageData: HackathonPageData;
    setHackathonPageData: (value: HackathonPageData) => void;
  };

  useEffect(() => {
    updateTitle("Admin Dashboard");
  }, []);

  useEffect(() => {
    if (hackathonPageData == undefined) {
      return;
    }

    setTheme(hackathonPageData.theme);
    setThemeDescription(hackathonPageData.themeDescription);
    setExampleSubmissionSlidesLink(
      hackathonPageData.exampleSubmissionSlidesLink,
    );
    setRubricLink(hackathonPageData.rubricLink);
    setSubmissionLink(hackathonPageData.submissionLink);
    setFeedbackFormLink(hackathonPageData.feedbackFormLink);
    setWifiNetworkName(hackathonPageData.wifiNetworkName);
    setWifiPassword(hackathonPageData.wifiPassword);
  }, [hackathonPageData]);

  const triggerNotification = (
    title: string,
    type: "success" | "warning" | "error",
    message: string,
  ) => {
    setNotification(true);
    setNotificationTitle(title);
    setNotificationType(type);
    setNotificationMessage(message);
  };

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      if (!isImportant && !isAdmin) {
        router.push("/");
        return;
      }

      const users = collection(db, "users");
      getDocs(users)
        .then((querySnapshot) => {
          const data: any = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setUserList(data);
          setFilteredUserList(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [user, isImportant, isAdmin, router]);

  useEffect(() => {
    setFilteredUserList(userList);
  }, [userList]);

  //!!! this does not refer to the resource page with all the tutorials on it
  //!!! as I was doing a bit of refactoring i realized calling the page the hackathon page instead of the hackathon resource page was a better idea
  //!!! I could not be bothered to change the name of all the vars though
  const toggleResourcePageVisibility = () => {
    setResourcePageVisibility(!hackathonPageViewable).then(() => {
      updateHackathonPageViewable(!hackathonPageViewable);
      triggerNotification(
        "Updated visibility",
        "success",
        "You wont see any changes on your end.",
      );
    });
  };

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    let search = event.target.value;
    const filteredUsers = userList.filter((user) => {
      return (
        user.email.toLowerCase().includes(search) ||
        user.name.toLowerCase().includes(search)
      );
    });
    setFilteredUserList(filteredUsers);
  };

  const updateUsersHelperStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid) {
      triggerNotification(
        "Failed to update helper",
        "error",
        "You can't change your own status",
      );
      return;
    }

    if (user.isImportant) {
      triggerNotification(
        "Failed to update helper",
        "error",
        "You cant change this users roles",
      );
      return;
    }

    const updatedUserList = userList.map((u) => {
      if (u.uid === user.uid) {
        return { ...u, isHelper: !u.isHelper };
      }
      return u;
    });

    setUserList(updatedUserList);

    const userRef = doc(db, "users", user.uid);
    const newHelperStatus = !user.isHelper;
    setDoc(
      userRef,
      {
        isHelper: newHelperStatus,
      },
      { merge: true },
    ).catch((error) => {
      console.log(error);
      triggerNotification("Failed to update helper", "error", "Unknown error");
    });
  };

  const updateUsersAdminStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid) {
      triggerNotification(
        "Failed to update admin",
        "error",
        "You can't change your own status",
      );
      return;
    }

    if (user.isImportant) {
      triggerNotification(
        "Failed to update admin",
        "error",
        "This user is Important",
      );
      return;
    }

    const updatedUserList = userList.map((u) => {
      if (u.uid === user.uid) {
        return { ...u, isAdmin: !u.isAdmin };
      }
      return u;
    });

    setUserList(updatedUserList);
    const userRef = doc(db, "users", user.uid);
    const newAdminStatus = !user.isAdmin;
    setDoc(
      userRef,
      {
        isAdmin: newAdminStatus,
      },
      { merge: true },
    ).catch((error) => {
      console.log(error);
      triggerNotification("Failed to update admin", "error", "Unknown error");
    });
  };

  const updateHackathonPage = () => {
    if (
      theme == "" ||
      themeDescription == "" ||
      exampleSubmissionSlidesLink == "" ||
      rubricLink == "" ||
      submissionLink == "" ||
      feedbackFormLink == "" ||
      wifiNetworkName == "" ||
      wifiPassword == ""
    ) {
      triggerNotification(
        "Failed to update hackathon page",
        "error",
        "All fields must have content",
      );
      return;
    }

    // valid link example: https://docs.google.com/presentation/d/1nlsooeK3z3J6DPyLEgatEinUvGxJ2TDhnXSIJfM-kWQ/edit?usp=sharing
    if (
      !exampleSubmissionSlidesLink.startsWith(
        "https://docs.google.com/presentation/d/",
      )
    ) {
      triggerNotification(
        "Invalid Example Slide Link",
        "error",
        "Example slide link must lead to a google slide",
      );
      return;
    }

    if (!exampleSubmissionSlidesLink.endsWith("/edit?usp=sharing")) {
      triggerNotification(
        "Invalid Example Slide Link",
        "error",
        "Example slide link must be /edit?usp=sharing",
      );
      return;
    }

    // converts the sharing link to a copy link
    let linkParts = exampleSubmissionSlidesLink.split("/");
    linkParts[linkParts.length - 1] = "copy";
    let link = linkParts.join("/");

    let data: HackathonPageData = {
      theme: theme,
      themeDescription: themeDescription,
      exampleSubmissionSlidesLink: exampleSubmissionSlidesLink,
      copyExampleSubmissionSlidesLink: link,
      rubricLink: rubricLink,
      submissionLink: submissionLink,
      feedbackFormLink: feedbackFormLink,
      wifiNetworkName: wifiNetworkName,
      wifiPassword: wifiPassword,
    };

    setHackathonPageData(data);

    let stringData = JSON.stringify(data);
    if (stringData == JSON.stringify(hackathonPageData)) {
      triggerNotification(
        "Update Cancelled",
        "warning",
        "New data is the same as current data",
      );
      return;
    }

    updateHackathonPageData(stringData).then(() => {
      triggerNotification("Success", "success", "Hackathon page updated!");
    });
  };

  const updateEventDay = () => {
    console.log("here");
  };

  const addEvent = () => {
    setEditingScheduleItem(false);
    if (scheduleItemName == "" || scheduleItemTime == "") {
      triggerNotification(
        "Failed to add event",
        "error",
        "An event must have a name and a time",
      );
      return;
    }

    let data = eventSchedule;

    data.push({ name: scheduleItemName, time: scheduleItemTime });

    setEventSchedule(data);

    setScheduleItemTime("");
    setScheduleItemName("");
    setAddingScheduleItem(false);
    setAbleToPublishEvents(true);
  };

  const cancelAddEvent = () => {
    setAddingScheduleItem(false);
    setScheduleItemName("");
    setScheduleItemTime("");
  };

  const removeEvent = (id: number) => {
    setAbleToPublishEvents(true);

    let data = [...eventSchedule];
    data.splice(id, 1);

    setEventSchedule(data);
  };

  const moveEventUp = (id: number) => {
    setAbleToPublishEvents(true);

    const data = [...eventSchedule];
    const current = data[id];

    if (id === 0) {
      data[id] = data[data.length - 1];
      data[data.length - 1] = current;
    } else {
      data[id] = data[id - 1];
      data[id - 1] = current;
    }

    setEventSchedule(data);
  };

  const moveEventDown = (id: number) => {
    setAbleToPublishEvents(true);

    const data = [...eventSchedule];
    const current = data[id];

    if (id === eventSchedule.length - 1) {
      data[id] = data[0];
      data[0] = current;
    } else {
      data[id] = data[id + 1];
      data[id + 1] = current;
    }

    setEventSchedule(data);
  };

  const editEvent = (id: number) => {
    setEditingScheduleItem(true);
    setAddingScheduleItem(false);
    setEditingId(id);
    setAbleToPublishEvents(true);
    setScheduleItemName(eventSchedule[id].name);
    setScheduleItemTime(eventSchedule[id].time);
  };

  const saveEdits = (id: number) => {
    if (scheduleItemName == "" || scheduleItemTime == "") {
      triggerNotification(
        "Failed to update event",
        "error",
        "An event must have a name and a time",
      );
      return;
    }

    let data = eventSchedule;

    data[id].name = scheduleItemName;
    data[id].time = scheduleItemTime;

    setEventSchedule(data);
    setScheduleItemTime("");
    setScheduleItemName("");
    setEditingScheduleItem(false);
  };

  const publishEventSchedule = () => {
    setAbleToPublishEvents(false);
    console.log("here");

    let jsonData = JSON.stringify(eventSchedule);

    //TODO: if the scheudle as json is the same as the schedule in the layout context dont publish
    //TODO only fetch schedule in the layout context when the user goes to the about page

    updateSchedule(jsonData);

    triggerNotification("Success", "success", "Hackathon schedule updated!");
  };

  return (
    <>
      <section className="w-full flex-col gap-2">
        <h1 className="text-xl font-bold font-heading text-onyx-200 text-center">
          Event Details
        </h1>
        <div className="text-neutral-700 font-space-mono pb-2">
          <h2 className="text-xl text-onyx-200 font-bold">
            Event is Scheduled
          </h2>
          <div className="flex gap-2 items-center mt-2">
            <div
              onClick={() => setEventIsSet(!eventIsSet)}
              className={`rounded border border-fairy_tale hover:border-fairy_tale-300 w-9 h-9 ${eventIsSet ? "bg-fairy_tale" : ""} cursor-pointer transition-all duration-150 ease-in-out`}
            ></div>
            <p>Event is Scheduled</p>
          </div>
        </div>
        <section
          className={`${eventIsSet ? "" : "hidden"} flex flex-col gap-2`}
        >
          <TextInput
            value={eventDay}
            onChange={(e) => setEventDay(e.target.value)}
            placeholder="Event Day"
            customClass="w-full"
          />
          <TextInput
            value={signUpLink}
            onChange={(e) => setSignUpLink(e.target.value)}
            placeholder="Sign Up Link"
            customClass="w-full"
          />
          <Button
            onClick={updateEventDay}
            title="Update Event Day"
            style="normal"
          />
        </section>
        <section>
          <h1 className="text-xl font-bold font-heading text-onyx-200 text-center">
            Event Schedule
          </h1>
          <div className="flex gap-2 flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  {eventSchedule.map((event: EventScheduleItem, i: number) => (
                    <tr key={i} className="flex justify-between items-center">
                      <td className="py-2 px-4 font-space-mono text-xl text-neutral-700 w-full">
                        {edditingScheduleItem && editingId == i ? (
                          <TextInput
                            value={scheduleItemName}
                            onChange={(e) =>
                              setScheduleItemName(e.target.value)
                            }
                            placeholder="Event Name"
                            customClass="w-full"
                          />
                        ) : (
                          <p>{event.name}</p>
                        )}
                      </td>
                      <td className="py-2 px-4 font-space-mono text-xl text-neutral-700 w-full">
                        {edditingScheduleItem && editingId == i ? (
                          <TextInput
                            value={scheduleItemTime}
                            onChange={(e) =>
                              setScheduleItemTime(e.target.value)
                            }
                            placeholder="Event Time"
                            customClass="w-full"
                          />
                        ) : (
                          <p>{event.time}</p>
                        )}
                      </td>
                      <td className="flex gap-2 items-center justify-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`cursor-pointer ${edditingScheduleItem ? "hidden" : ""}`}
                          onClick={() => editEvent(i)}
                        >
                          <path d="m320 112 48-48 80 80-48 48zM128 304l160-160 80 80-160 160zm-32 32 80 80-112 32z" />
                        </svg>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`cursor-pointer ${!edditingScheduleItem || editingId != i ? "hidden" : ""}`}
                          onClick={() => saveEdits(i)}
                        >
                          <path
                            d="M4 2h14v2H4v16h2v-6h12v6h2V6h2v16H2V2zm4 18h8v-4H8zM20 6h-2V4h2zM6 6h9v4H6z"
                            fill="#000"
                          />
                        </svg>
                        <svg
                          width="30"
                          height="30"
                          viewBox="-7 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`cursor-pointer ${!edditingScheduleItem || editingId != i ? "hidden" : ""}`}
                          onClick={() => setEditingScheduleItem(false)}
                        >
                          <path d="m16.844 9.156-6.375 7.875 6.938 8.563h-2.906l-5.469-6.781-5.5 6.781H.626l6.969-8.563L1.22 9.156h2.906l4.906 6.063 4.875-6.063z" />
                        </svg>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 -6 524 524"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`cursor-pointer ${edditingScheduleItem ? "hidden" : ""}`}
                          onClick={() => moveEventUp(i)}
                        >
                          <path d="m460 321-34 34-164-163L98 355l-34-34 198-196z" />
                        </svg>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 -6 524 524"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`cursor-pointer ${edditingScheduleItem ? "hidden" : ""}`}
                          onClick={() => moveEventDown(i)}
                        >
                          <path d="m64 191 34-34 164 163 164-163 34 34-198 196z" />
                        </svg>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 76 76"
                          xmlns="http://www.w3.org/2000/svg"
                          baseProfile="full"
                          className={`cursor-pointer ${edditingScheduleItem ? "hidden" : ""}`}
                          onClick={() => removeEvent(i)}
                        >
                          <path d="M19 38h38v6H19z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button
              onClick={() => setAddingScheduleItem(true)}
              title="Add Event"
              style="normal"
              classModifier={`${addingScheduleItem ? "hidden" : ""} w-full`}
            />
            <div
              className={`flex flex-col w-full gap-2 ${addingScheduleItem ? "" : "hidden"}`}
            >
              <div className="flex gap-2">
                <TextInput
                  value={scheduleItemName}
                  onChange={(e) => setScheduleItemName(e.target.value)}
                  placeholder="Event Name"
                  customClass="w-full"
                />
                <TextInput
                  value={scheduleItemTime}
                  onChange={(e) => setScheduleItemTime(e.target.value)}
                  placeholder="Event Time"
                  customClass="w-full"
                />
              </div>
              <div className="w-full flex gap-2">
                <Button
                  onClick={cancelAddEvent}
                  title="Cancel"
                  style="red"
                  classModifier="w-full"
                />
                <Button
                  onClick={addEvent}
                  title="Confirm"
                  style="green"
                  classModifier="w-full"
                />
              </div>
            </div>
            <Button
              onClick={publishEventSchedule}
              title="Publish Schedule"
              style="normal"
              classModifier={`${ableToPublishEvents ? "" : "hidden"}`}
            />
          </div>
        </section>
      </section>
      <section className="w-full flex-col gap-2">
        <h1 className="text-xl font-bold font-heading text-onyx-200 text-center">
          Hackathon Page Management
        </h1>
        <div className="text-neutral-700 font-space-mono pb-2">
          <h2 className="text-xl text-onyx-200 font-bold">
            Change Hackathon Page Visibility
          </h2>
          <p className="font-space-mono text-neutral-700">
            If checked, allows all users to view the hackathon theme and other
            event details
          </p>
          <div className="flex gap-2 items-center mt-2">
            <div
              onClick={toggleResourcePageVisibility}
              className={`rounded border border-fairy_tale hover:border-fairy_tale-300 w-9 h-9 ${hackathonPageViewable ? "bg-fairy_tale" : ""} cursor-pointer transition-all duration-150 ease-in-out`}
            ></div>
            <p>Allow access to Hackathon page</p>
          </div>
        </div>
        <section className="flex flex-col gap-2 w-full">
          <TextInput
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Hackahton Theme"
            customClass="w-full"
          />
          <TextArea
            value={themeDescription}
            onChange={(e) => setThemeDescription(e.target.value)}
            placeholder="Hackathon Theme Description"
            customClass="w-full"
          />
          <TextInput
            value={exampleSubmissionSlidesLink}
            onChange={(e) => setExampleSubmissionSlidesLink(e.target.value)}
            placeholder="Example Submission Slides Link"
            customClass="w-full"
          />
          <TextInput
            value={rubricLink}
            onChange={(e) => setRubricLink(e.target.value)}
            placeholder="Rubric Link"
            customClass="w-full"
          />
          <TextInput
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
            placeholder="Submission Link"
            customClass="w-full"
          />
          <TextInput
            value={feedbackFormLink}
            onChange={(e) => setFeedbackFormLink(e.target.value)}
            placeholder="Feedback Form Link"
            customClass="w-full"
          />
          <div className="flex gap-2">
            <TextInput
              value={wifiNetworkName}
              onChange={(e) => setWifiNetworkName(e.target.value)}
              placeholder="Wifi Network Name"
              customClass="w-full"
            />
            <TextInput
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
              placeholder="Wifi Network Password"
              customClass="w-full"
            />
          </div>
          <Button
            onClick={updateHackathonPage}
            title="Update Hackathon Page"
            style="normal"
          />
        </section>
      </section>
      <h1 className="text-xl font-bold font-heading text-onyx-200">
        User Management
      </h1>
      <TextInput
        value={searchTerm}
        onChange={searchUsers}
        placeholder="Search Users"
        customClass="w-full"
      />
      <section className="w-full h-[35rem] rounded-xl overflow-y-scroll">
        <div className="grid grid-cols-3 gap-2 mt-2 overflow-y-scroll w-full items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filteredUserList.map((user: any) => (
            <div
              key={user.uid}
              className="border-t-2 border-fairy_tale hover:border-t-4 rounded-t-lg rounded-b-lg bg-onyx p-2 rounded-none h-56 transition-all duration-200 ease-in-out flex flex-col justify-between"
            >
              <div>
                <h2 className="px-1">{user.name}</h2>
                <p className="px-1">{user.email}</p>
              </div>
              <section className="flex w-full gap-2 mt-2">
                {isAdmin || isImportant ? (
                  <div className="w-full">
                    <p className="bg-fairy_tale text-onyx text-center p-1 rounded-t">
                      {user.isHelper ? "Helper" : "Not Helper"}
                    </p>
                    <Button
                      onClick={() => updateUsersHelperStatus(user)}
                      title={user.isHelper ? "Remove" : "Add"}
                      style={user.isHelper ? "red" : "green"}
                      classModifier="rounded-t-none rounded-b !p-1 w-full"
                    />
                  </div>
                ) : null}
                {isAdmin || isImportant ? (
                  <div className="w-full">
                    <p className="bg-fairy_tale text-onyx text-center p-1 rounded-tl-lg rounded-tr-lg">
                      {user.isAdmin ? "Admin" : "Not Admin"}
                    </p>
                    <Button
                      onClick={() => updateUsersAdminStatus(user)}
                      title={user.isAdmin ? "Remove" : "Add"}
                      style={user.isAdmin ? "red" : "green"}
                      classModifier="rounded-t-none rounded-b !p-1 w-full"
                    />
                  </div>
                ) : null}
              </section>
            </div>
          ))}
        </div>
      </section>
      {notification ? (
        <Notification
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={(value) => setNotification(value)}
        />
      ) : null}
    </>
  );
}
