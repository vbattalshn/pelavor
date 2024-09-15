import Layout from "@/components/dashboardLayout";
import Image from "next/image";
import VerificationBadge from "@/assets/icons/verificationBadge";
import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import Markdown from "react-markdown";
import Input from "@/components/input";
import Button from "@/components/button";
import toast from "react-hot-toast";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages();
    setInterval(() => {
        getMessages();
    }, 5000);
  }, []);

  function getMessages() {
    setLoading(true);

    apiClient
      .get("/get-messages")
      .then((response) => {
        setMessages(response.data.data.messages);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Bir hata oluştu");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function scrollToBottom() {
    const scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  return (
    <Layout>
      <div
        id="message-container"
        className="flex flex-col p-2 gap-2 max-w-5xl relative"
      >
        <div className="flex-1 flex flex-col gap-2">
          {messages.map((message, index) => (
            <Message
              avatar={message.sender_user.Profile_photo}
              date={message.date}
              fullname={message.sender_user.fullname}
              message={message.message}
              verification={
                message.sender_user.User_verification_status ? true : false
              }
              key={index}
              sender={message.sender}
            />
          ))}
        </div>
        <SendMessage />
        </div>
    </Layout>
  );
}

function Message({ avatar, date, fullname, message, verification, sender }) {
  return (
    <div
      className={
        "flex gap-2 items-start animate-loaded " + (sender ? "flex-row-reverse" : null)
      }
    >
      <Image
        width={100}
        height={100}
        src={avatar}
        alt={fullname + " avatar"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="p-4 bg-neutral-200 rounded-lg flex flex-col gap-2 max-w-3xl">
        <div className="flex gap-2">
          <span className="font-semibold text-neutral-800 flex gap-1 items-center">
            {fullname}
            {verification ? <VerificationBadge /> : null}
          </span>
          <span className="font-normal text-neutral-600">{date}</span>
        </div>
        <Markdown className="text-neutral-700 space-y-2 message">{message}</Markdown>
      </div>
    </div>
  );
}

function SendMessage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

    function sendMessage() {
        setLoading(true)
        var data = {
            message,
            "group": "all_users"
        }

        apiClient
        .post("/send-message", data)
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Bir hata oluştu.");
        })
        .finally(() => {
          setLoading(false);
        });
  
    }

  return (
    <div className="flex sticky bottom-2 bg-neutral-200 rounded-lg shadow-lg">
      <Input
        value={message}
        setValue={setMessage}
        type="text"
        placeholder="Bir Mesaj Yaz"
        className="border-0 flex-1 rounded-ee-none rounded-se-none"
      />
      <Button
        label="Gönder"
        onClick={sendMessage}
        loading={loading}
        loadingLabel="Gönderiliyor..."
        className="rounded-lg rounded-es-none rounded-ss-none"
      />
    </div>
  );
}
