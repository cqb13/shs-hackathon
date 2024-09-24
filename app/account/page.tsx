"use client";

import ConnectedButton from "@/components/general/connectedButton";
import Notification from "@/components/general/Notification";
import deleteAccount from "@/firebase/db/users/deleteUser";
import Button from "@/components/general/Button";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useState } from "react";

export default function Account() {
  const router = useRouter();

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);

  const triggerNotification = (
    title: string,
    type: "success" | "error",
    message: string,
  ) => {
    setNotification(true);
    setNotificationTitle(title);
    setNotificationType(type);
    setNotificationMessage(message);
  };

  const startDeleteWorkflow = () => {
    setConfirmDeletePopup(true);
  };

  const stopDeleteWorkflow = () => {
    setConfirmDeletePopup(false);
  };

  const deleteAccountHandler = () => {
    deleteAccount(auth.currentUser)
      .then(() => {
        setConfirmDeletePopup(false);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        triggerNotification(
          "Failed to delete account",
          "error",
          "Unknown error",
        );
      });
  };

  return (
    <>
      <Button
        onClick={startDeleteWorkflow}
        title="Delete Account"
        style="red"
        classModifier="p-5 text-lg w-full mb-2"
      />
      {confirmDeletePopup ? (
        <section className="fixed flex items-center justify-center left-0 top-0 w-full h-full bg-onyx-100 bg-opacity-50">
          <div className="p-10 bg-white rounded-xl">
            <p className="text-onyx">
              Are you sure you want to delete your account?
            </p>
            <ConnectedButton
              leftStyle="red"
              rightStyle="normal"
              onClickLeft={deleteAccountHandler}
              onClickRight={stopDeleteWorkflow}
              leftTitle="Yes"
              rightTitle="No"
              leftClassModifier="w-full"
              rightClassModifier="w-full"
              containerClassModifier="w-full"
            />
          </div>
        </section>
      ) : null}
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
