import Arrow from "@/assets/icons/arrow";
import AddIcon from "@/assets/icons/add";
import RemoveIcon from "@/assets/icons/remove";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import ErrorMessage from "@/components/errormessage";
import apiClient from "@/lib/api";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import CorrectMessage from "./correctmessage";

export default function AddNewWord({ addWordtoList }) {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState("");
  const [meanings, setMeanings] = useState([""]);
  const [loading, setLoading] = useState(false);

  function Add() {
    let nonEmptyMeanings = meanings.filter((meaning) => meaning.trim() !== "");

    setError("");
    setCorrect("")
    setLoading(true);
    const data = {
      word,
      meanings: nonEmptyMeanings,
    };

    apiClient
      .post("/save_word", data)
      .then((response) => {
        setCorrect(response.data.message);
        addWordtoList(word);
        setWord("");
        setMeanings([""]);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setError(error.response.data.message);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <Disclosure
      as="div"
      className="bg-neutral-200/50 border border-neutral-200 p-2 rounded-lg flex flex-col gap-2 transition"
    >
      <div className="text-neutral-800 font-semibold text-lg flex justify-between items-center">
        <span>
          Yeni bir{" "}
          <span className="text-indigo-600 underline italic">kelime</span> ekle
        </span>
        <DisclosureButton className="p-1 hocus:bg-neutral-300 rounded transition-all data-[open]:rotate-180">
          <Arrow className="w-6 h-6" />
        </DisclosureButton>
      </div>
      <DisclosurePanel className="flex gap-2 flex-col">
        <CorrectMessage className="w-full" message={correct} />
        <AddWord
          word={word}
          setWord={setWord}
          meanings={meanings}
          setMeanings={setMeanings}
          loading={loading}
          error={error}
          Add={Add}
        />
      </DisclosurePanel>
    </Disclosure>
  );
}

function AddWord({
  word,
  setWord,
  meanings,
  setMeanings,
  loading,
  error,
  Add,
}) {
  function handleMeaningChange(index, value) {
    const newMeanings = [...meanings];
    newMeanings[index] = value;
    setMeanings(newMeanings);
  }

  function addMeaning() {
    setMeanings([...meanings, ""]);
  }

  function removeMeaning() {
    if (meanings.length > 1) {
      setMeanings(meanings.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage error={error} className="w-full" />
      <label className="flex flex-col gap-1 font-semibold">
        Kelime
        <Input
          type="text"
          id="word"
          value={word}
          setValue={setWord}
          className="w-full !bg-neutral-100"
        />
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        Anlamlar
        {meanings.map((meaning, index) => (
          <Input
            key={index}
            type="text"
            value={meaning}
            setValue={(value) => handleMeaningChange(index, value)}
            className="w-full !bg-neutral-100"
          />
        ))}
        <div className="flex gap-2">
          <button
            onClick={addMeaning}
            className="flex flex-1 items-center justify-center border-2 text-indigo-600 border-indigo-600 border-dashed rounded-lg p-2"
          >
            <AddIcon className="w-8 h-8" />
          </button>
          {meanings.length > 1 ? (
            <button
              onClick={removeMeaning}
              className="flex items-center justify-center border-2 text-red-600 border-red-600 hocus:border-red-600 hocus:ring-red-600/50 border-dashed rounded-lg p-2"
            >
              <RemoveIcon className="w-8 h-8" />
            </button>
          ) : null}
        </div>
      </label>
      <Button
        onClick={Add}
        loading={loading}
        label="Ekle"
        className="w-full rounded-lg"
      />
    </div>
  );
}
