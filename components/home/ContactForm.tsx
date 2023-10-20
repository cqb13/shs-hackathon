"use client";

import Notification from "../general/Notification";
import TextInput from "../general/TextInput";
import TextArea from "../general/TextArea";
import Button from "../general/Button";
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
    "success"
  );

  const sendEmail = () => {
    if (!firstName || !lastName || !email || !message) {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationMessage("Please fill out all fields.");
      setNotificationType("error");
      return;
    }

    setNotification(true);
    setNotificationTitle("Success");
    setNotificationMessage("Will send, at some point.");
    setNotificationType("success");

    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className='flex flex-col gap-5 w-full'>
      <div className='flex gap-5 w-full'>
        <TextInput
          value={firstName}
          placeholder='First Name'
          onChange={(e: any) => setFirstName(e.target.value)}
          customClass='w-full'
        />
        <TextInput
          value={lastName}
          placeholder='Last Name'
          onChange={(e: any) => setLastName(e.target.value)}
          customClass='w-full'
        />
      </div>
      <TextInput
        value={email}
        placeholder='Email'
        onChange={(e: any) => setEmail(e.target.value)}
        customClass='w-full'
      />
      <TextArea
        value={message}
        placeholder='Message'
        onChange={(e: any) => setMessage(e.target.value)}
        customClass='w-full'
      />
      <Button onClick={sendEmail} text='Submit' customClass='w-full' />
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
