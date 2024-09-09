"use client";

import Notification from "../general/notification";
import TextInput from "../general/TextInput";
import TextArea from "../general/textArea";
import Button from "../general/button";
import emailjs from "emailjs-com";
import { useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );

  const sendEmail = async () => {
    if (!firstName || !lastName || !email || !message) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationMessage("Please fill out all fields.");
      setNotificationType("error");
      return;
    }

    try {
      const serviceID = process.env.NEXT_PUBLIC_VERCEL_ENV_EMAIL_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_VERCEL_ENV_EMAIL_TEMPLATE_ID;
      const userID = process.env.NEXT_PUBLIC_VERCEL_ENV_EMAIL_USER_ID;

      if (!serviceID || !templateID || !userID) {
        setNotification(true);
        setNotificationTitle("Error");
        setNotificationMessage("Failed to load email credentials.");
        setNotificationType("error");
        return;
      }

      await emailjs.send(
        serviceID,
        templateID,
        {
          subject: "SHS Hackathon Contact Form",
          from_name: `${firstName} ${lastName}`,
          from_email: `${email}`,
          message: `${message}`,
        },
        userID,
      );

      setNotification(true);
      setNotificationTitle("Success");
      setNotificationMessage("Email sent successfully.");
      setNotificationType("success");
    } catch (e) {
      console.error(e);
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationMessage("Something went wrong.");
      setNotificationType("error");
      return;
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex gap-5 w-full">
        <TextInput
          value={firstName}
          placeholder="First Name"
          onChange={(e: any) => setFirstName(e.target.value)}
          customClass="w-full bg-opacity-5"
        />
        <TextInput
          value={lastName}
          placeholder="Last Name"
          onChange={(e: any) => setLastName(e.target.value)}
          customClass="w-full bg-opacity-5"
        />
      </div>
      <TextInput
        value={email}
        placeholder="Email"
        onChange={(e: any) => setEmail(e.target.value)}
        customClass="w-full bg-opacity-5"
      />
      <TextArea
        value={message}
        placeholder="Message"
        onChange={(e: any) => setMessage(e.target.value)}
        customClass="w-full bg-opacity-5"
      />
      <Button
        onClick={sendEmail}
        title="Submit"
        style="normal"
        classModifier="w-full"
      />
      {notification && (
        <Notification
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={setNotification}
        />
      )}
    </section>
  );
}
