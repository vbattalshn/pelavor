import { useState } from "react";
import Arrow from "@/assets/icons/arrow";
import apiClient from "@/lib/api";

export default function WordContent({ index, word }) {
    const [isOpenned, setIsOpenned] = useState(false);
    const [meanings, setMeanings] = useState(false);
  
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
  
    function getWordData() {
      const data = {
        word: word,
      };
  
      apiClient
        .post("/get-word-data", data)
        .then((response) => {
          setMeanings(response.data.data.meanings);
        })
        .catch((error) => {
          console.error("Error fetching list data:", error);
        })
        .finally(() => setIsOpenned(true));
    }
  
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
            {index + 1}. {word}
          </span>
          <Arrow
            className={"transition-all " + (isOpenned ? "rotate-180" : null)}
          />
        </button>
        {isOpenned ? (
          <div className="flex flex-col px-4 pb-2 gap-1 text-neutral-700 animate-loaded">
            {meanings.length > 0 ? (
              meanings.map((meaning, index) => (
                <span key={index} className="">
                  {index + 1}. {meaning}
                </span>
              ))
            ) : (
              <p>İçerik Yok</p>
            )}
          </div>
        ) : null}
      </div>
    );
  }
  