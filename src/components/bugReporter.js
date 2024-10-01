import Bug from "@/assets/icons/bug";
import { useState } from "react";
import Input from "./input";
import Button from "./button";
import Cross from "@/assets/icons/cross";
import ErrorMessage from "./errormessage";
import CorrectMessage from "./correctmessage";
import apiClient from "@/lib/api";

export default function BugReporter() {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <>
      <button
        onClick={toggleOpened}
        className="flex gap-2 items-center justify-center fixed bottom-3 left-3 bg-red-600 border !border-red-600 !ring-red-600/50 hocus:bg-red-600/75 rounded-full p-2 px-4 text-neutral-200 transition-all shadow-xl z-10"
      >
        <Bug className="w-8 h-8" />
        <span>Bug Bildir!</span>
      </button>
      {opened && <Modal toggleOpened={toggleOpened} />}
    </>
  );
}

function Modal({ toggleOpened }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sendReport = () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const data = {
      subject,
      description,
    };

    apiClient
      .post("/save-contact", data)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          toggleOpened();
        }, 5000);
      })
      .catch((error) => setError(error.response?.data?.message || 'Bir hata oluştu'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-neutral-800/50 backdrop-blur flex items-center justify-center z-50">
      <div className="flex flex-col gap-2 p-4 bg-neutral-200 rounded-xl">
        <div className="flex justify-between font-bold text-xl border-b pb-1 border-neutral-300">
          <span>Bug/Öneri Bildir</span>
          <button
            onClick={toggleOpened}
            className="hocus:bg-neutral-300 rounded transition-all"
          >
            <Cross className="w-8 h-8" />
          </button>
        </div>
        <ErrorMessage error={error} />
        <CorrectMessage message={successMessage} />
        <label className="flex flex-col gap-1 font-semibold">
          Konu
          <Input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="!bg-neutral-100/50"
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Açıklama
          <textarea
            className="w-full h-48 bg-neutral-100/50 px-4 py-3 resize-none border border-neutral-300 rounded-lg text-neutral-900 font-medium text-base"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <Button
          onClick={sendReport}
          loading={loading}
          label="Gönder"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
