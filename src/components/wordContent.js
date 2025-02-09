import { use, useState } from "react";
import Arrow from "@/assets/icons/arrow";
import apiClient from "@/lib/api";
import Spinner from "./spinner";

export default function WordContent({ index, id, word, lang = "en" }) {
  const [isOpenned, setIsOpenned] = useState(false);
  const [meanings, setMeanings] = useState(false);
  const [loading, setLoading] = useState(false);

  function openMeanings() {
    if (isOpenned) {
      setIsOpenned(false);
      return;
    }

    if (meanings) {
      setIsOpenned(true);
    } else {
      getWordData();
    }
  }

  const getWordData = () => {
    setLoading(true);
    const data = {
      id: id,
      word: word,
      lang: lang,
    };

    apiClient
      .post("/get-word-data", data)
      .then((response) => {
        setMeanings(response.data.data.meanings);
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      })
      .finally(() => {
        setIsOpenned(true);
        setLoading(false);
      });
  };

  return (
    <div
      className={
        "rounded-md hocus:bg-neutral-200 " +
        (isOpenned ? "!bg-neutral-200" : null)
      }
    >
      <button
        onClick={openMeanings}
        key={index}
        className="p-2 w-full flex items-center justify-between text-neutral-800 rounded-md active:!scale-100 hocus:!ring-0"
      >
        <span>
          {loading == true ? "Yükleniyor.." : index + 1 + ". " + word}
        </span>
        {loading ? (
          <Spinner className="w-6 h-6" />
        ) : (
          <Arrow
            className={"transition-all " + (isOpenned ? "rotate-180" : null)}
          />
        )}
      </button>
      {isOpenned ? (
        <div className="flex flex-col px-4 pb-2 gap-1 text-neutral-700 animate-loaded">
          {meanings.length > 0 ? (
            meanings.map((word, index) => (
              <span key={index} className="">
                {index + 1}. {word.word}
              </span>
            ))
          ) : (
            <p>{meanings}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
