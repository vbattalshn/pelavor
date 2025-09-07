import Header from "@/components/header";
import CheckAuth from "@/components/checkAuth";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useRouter } from "next/router";
import apiClient from "@/lib/api";
import toast from "react-hot-toast";
import Like from "@/assets/icons/like";
import { Sheet } from "react-modal-sheet";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Ad1 from "@/components/ads/ad1";
import Footer from "@/components/footer";
import Volume from "@/assets/icons/volume";
import PlayAdd from "@/assets/icons/playAdd";
import Cookies from "js-cookie";
import AdUnit from "@/components/ads/adunit";

export default function Play() {
  const [answer, setAnswer] = useState();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [data, setData] = useState([]);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.slug) {
      setUrl(router.query.slug);
    }
  }, [router.isReady, router.query.slug]);

  useEffect(() => {
    if (url) {
      getRandomWord();
    }
  }, [url]);

  useEffect(() => {
    if ("visualViewport" in window) {
      on_height_change(function (height) {
        document.documentElement.style.setProperty("--terminal-force-height",height);
      });
    }
  })

  const closeSheet = () => {
    getRandomWord();
    setCorrectAnswer([]);
    setAnswerIsCorrect(null);
    setIsOpen(false);
  };

  const getRandomWord = () => {
    setLoading(true);
    const requestData = {
      url,
    };

    apiClient
      .post("/get-random-word", requestData)
      .then((response) => {
        setData(response.data?.data);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Bir hata oluştu.");
        router.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendAnswer = () => {
    setIsSending(true);

    if (answer == null) {
      toast.error("HATA");
      setIsSending(false);
    } else {
      const requestData = {
        word: data.word,
        answer: answer,
      };

      apiClient
        .post("/check-answer", requestData)
        .then((response) => {
          setAnswerIsCorrect(true);
          setTimeout(() => {
            getRandomWord();
            setAnswerIsCorrect(null);
          }, 2000);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.length > 0
          ) {
            setCorrectAnswer(JSON.parse(error.response?.data?.data));
            setAnswerIsCorrect(false);
            setTimeout(() => {
              setIsOpen(true);
            }, 1000);
          } else {
            toast.error(error.response.data.message);
          }
        })
        .finally(() => {
          setIsSending(false);
          setAnswer(null);
        });
    }
  };

  function on_height_change(callback) {
    let { height } = window.visualViewport;
    callback(height);
    window.visualViewport.addEventListener("resize", function (event) {
      const { height: newHeight } = window.visualViewport;
      if (height !== newHeight) {
        height = newHeight;
        callback(height);
      }
    });
  }

  function getMeanings() {
    setIsSending(true);
    const wordData = {
      word: data.word,
    };

    apiClient
      .post("/get-word-data", wordData)
      .then((response) => {
        setCorrectAnswer(response.data.data.meanings);
        setIsOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
        toast.error("Error: XC1");
      })
      .finally(() => setIsSending(false));
  }

  return (
    <CheckAuth>
      <Head>
        {loading == false ? (
          <title>{data.title} | Pelavor</title>
        ) : (
          <title>Yükleniyor... | Pelavor</title>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"/>

      </Head>

      <Header />
      {loading == false && data.progress_percent != 100 ? (
        <div className="max-w-5xl min-w-[clac(100lvh - 60px)] !min-w-[clac(--terminal-force-height) * 1px] mx-auto  flex p-4 flex-col gap-6 items-center sm:pb-32 pb-48 relative">
          <h1 className="font-semibold text-neutral-700">{data.title}</h1>
          <div className="w-full h-4 rounded-full bg-neutral-200 overflow-hidden">
            <span
              className={
                "w-[100%] h-full flex items-center text-sm justify-center text-neutral-200 font-bold bg-gradient-to-r bg-indigo-600 shadow-[0px_0px_8px_0px_rgb(0,0,0,0.5)] transition-all"
              }
              style={{ width: data.progress_percent + "%" }}
            >
              {data.progress_percent}%
            </span>
          </div>
          {answerIsCorrect == null ? (
            <>
              <div className="min-w-xs w-full bg-neutral-200/50 px-16 py-12 font-black font-mono rounded-xl text-5xl text-neutral-800 text-center">
                {data.word}
              </div>
              <Speak text={data.word} />
            </>
          ) : (
            <ResultAnimation correct={answerIsCorrect} />
          )}

          <AdUnit slot="8426563898" />

          <div className="fixed max-w-5xl w-11/12 p-4 flex gap-2 bottom-4 bg-neutral-200 rounded-xl sm:flex-row flex-col z-50">
            <Button
              label="Anlamları Gör"
              className="!bg-transparent px-4 rounded-lg !ring-red-600/50 !border-red-600 text-red-600"
              loading={isSending}
              onClick={getMeanings}
            />
            <Input
              value={answer}
              setValue={setAnswer}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendAnswer();
              }}
              type="text"
              className="flex-1 !bg-neutral-100 w-full"
              placeholder="Cevap"
              id="answer"
              autoFocus
            />
            <Button
              loading={isSending}
              label="Kontrol Et"
              className="rounded-lg"
              onClick={sendAnswer}
            ></Button>
          </div>
        </div>
      ) : loading == true ? (
        <LoadingPlaceholder />
      ) : (
        <CompeletedPage />
      )}
      <Sheet
        isOpen={isOpen}
        onClose={() => closeSheet()}
        detent="content-height"
      >
        <Sheet.Container className="!bg-neutral-100 !rounded-tr-2xl !rounded-tl-2xl overflow-hidden">
          <Sheet.Header className="" />
          <Sheet.Content className="max-w-5xl mx-auto w-full p-4 pb-8 flex gap-2 flex-col">
            <h1 className="text-2xl pb-1 text-neutral-700 font-semibold">
              {data.word} anlamları
            </h1>

            <ul>
              {correctAnswer.map((answer, index) => (
                <li
                  key={index}
                  className="text-neutral-700 p-2 border-b border-neutral-300 last:border-b-0 font-medium"
                >
                  {index + 1 + ". " + answer.word}
                </li>
              ))}
            </ul>

            <Button
              autoFocus={true}
              onClick={() => closeSheet()}
              label="Geç"
              className="rounded-lg px-8 w-fit"
              autofocus
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
      {/* <Footer /> */}
    </CheckAuth>
  );
}

function ResultAnimation({ correct }) {
  const [className, setClassname] = useState("pending");

  useEffect(() => {
    setTimeout(() => {
      setClassname(correct ? "correct" : "wrong");
    }, 500);
  }, []);

  return (
    <motion.div
      className={
        "p-8 rounded-xl flex items-center justify-center bg-yellow-300 text-neutral-100 transition-all rotate-90 " +
        className
      }
      animate={{
        rotate:
          className == "pending"
            ? 90
            : className == "correct"
            ? [10, 0]
            : [190, 180],
      }}
      transition={{ duration: 0.01, type: "spring" }}
      initial={false}
    >
      <Like className="w-16 h-16"></Like>
    </motion.div>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="animate-pulse max-w-5xl mx-auto flex p-4 flex-col gap-6 items-center sm:pb-32 pb-48 ">
      <div className="w-full h-4 rounded-full bg-neutral-300 overflow-hidden" />
      <h1 className="font-semibold w-4/5 h-6  bg-neutral-300 rounded-full" />
      <div className="bg-neutral-300 h-36 w-full font-black font-mono rounded-lg text-5xl text-neutral-800" />
      <div className="fixed max-w-5xl w-11/12 sm:h-20 h-40 bottom-4 bg-neutral-300 rounded-xl z-50" />
    </div>
  );
}

function CompeletedPage() {
  return (
    <div className="w-full h-content flex items-center justify-center gap-4 flex-col">
      <span className="text-7xl">🎉</span>
      <span className="text-xl text-neutral-800">
        Tebrikler bu listeyi bitirdin.
      </span>
    </div>
  );
}

function Speak({ text }) {
  const [autoSpeak, setAutoSpeak] = useState(false);
  useEffect(() => {
    const cookieValue = Cookies.get("autoSpeak");

    if (cookieValue) {
      const isAutoSpeak = cookieValue === "true";
      setAutoSpeak(isAutoSpeak);

      if (isAutoSpeak) {
        speak(text);
      }
    }
  }, [text]);

  const ToggleAutoSpeak = () => {
    Cookies.set("autoSpeak", !autoSpeak);
    setAutoSpeak(!autoSpeak);
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Dil İngilizce
    speech.rate = 0.75; // Konuşma hızı (1 normal hız)
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <button
        onClick={() => speak(text)}
        className="p-2 flex gap-2 bg-neutral-200 border border-neutral-200 text-neutral-800 rounded-full items-center overflow-hidden hocus:ring hocus:ring-indigo-600/50 hocus:border-indigo-600 hocus:bg-neutral-300/50"
      >
        <Volume className="w-7 h-7" />
        <span>Seslendir</span>
      </button>
      <button
        onClick={ToggleAutoSpeak}
        for="autoSpeak"
        className={
          "p-2 flex gap-2 bg-neutral-200 border border-neutral-200 text-neutral-800 rounded-full items-center overflow-hidden hocus:ring hocus:ring-indigo-600/50 hocus:border-indigo-600 hocus:bg-neutral-300/50" +
          (autoSpeak
            ? " !bg-indigo-600/75 border border-indigo-600 !text-neutral-200"
            : "")
        }
      >
        <PlayAdd className="w-7 h-7" />
        Otomatik seslendir
      </button>
    </div>
  );
}
