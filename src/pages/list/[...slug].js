import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import Image from "next/image";
import Creator from "@/components/creator";
import Calender from "@/assets/icons/calendar";
import Avatars from "@/assets/icons/avatars";
import AvatarTick from "@/assets/icons/avatarTick";
import Bookmark from "@/assets/icons/bookmark";
import Link from "next/link";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Arrow from "@/assets/icons/arrow";
import UnderConstruction from "@/components/underConstruction";
import toast from "react-hot-toast";
import Footer from "@/components/footer";

export default function List() {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState([null]);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { slug } = router.query;

    if (!slug) {
      router.push("/");
      return;
    } else {
      setUrl(slug[0]);
    }

    const data = {
      url: slug[0],
    };

    apiClient
      .post("/get-list", data)
      .then((response) => {
        setListData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      })
      .finally(() => setLoading(false));
  }, [router.isReady, router.query]);

  return (
    <div>
      <Header />
      {loading ? (
        "loading..."
      ) : (
        <main>
          <div>
            <ListHead
              image={listData.image}
              title={listData.title}
              user={listData.user}
              date={listData.created_date}
              RegisteredUserCount={listData.registered_users_count}
              CompletedUserCount={listData.completed_users_count}
              description={listData.description}
              url={url}
              joined={listData.joined}
            />
            <div className="max-w-5xl mx-auto px-2">
              <TabGroup>
                <TabList className="bg-neutral-200/50 w-full flex p-1 gap-1 rounded-lg border border-neutral-200 my-2">
                  <Tab className="flex-1 text-neutral-800 data-[selected]:!bg-indigo-600 rounded-md p-2 data-[selected]:text-neutral-300 data-[hover]:bg-neutral-200 data-[hover]:underline transition-all">
                    Liste İçeriği
                  </Tab>
                  <Tab className="flex-1 text-neutral-800 data-[selected]:!bg-indigo-600 rounded-md p-2 data-[selected]:text-neutral-300 data-[hover]:bg-neutral-200 data-[hover]:underline transition-all">
                    Yorumlar
                  </Tab>
                  <Tab className="flex-1 text-neutral-800 data-[selected]:!bg-indigo-600 rounded-md p-2 data-[selected]:text-neutral-300 data-[hover]:bg-neutral-200 data-[hover]:underline transition-all">
                    Ödüller
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ListContent words={listData.words} />
                  </TabPanel>
                  <TabPanel>
                    <UnderConstruction />
                  </TabPanel>
                  <TabPanel>
                    <UnderConstruction />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

function ListHead({
  image,
  title,
  user,
  date,
  RegisteredUserCount,
  CompletedUserCount,
  description,
  url,
  joined,
}) {
  const [isJoined, setIsJoined] = useState(joined);

  function JoinTheList() {
    const data = {
      url: url,
    };

    apiClient
      .post("/join-list", data)
      .then((response) => {
        toast.success(response.data.message);
        setIsJoined(true);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Bir hata oluştu");
        console.error("Error fetching list data:", error);
      })
      .finally();
  }

  return (
    <div className="bg-neutral-200 bg-listBgImage bg-center bg-auto">
      <div className="flex max-w-5xl lg:flex-row flex-col mx-auto gap-4 px-2 py-8 justify-center items-center animate-loaded">
        <Image
          src={image}
          width={200}
          height={200}
          className="w-48 h-48 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{title}</h1>
          <div className="flex gap-2 text-neutral-700 lg:flex-row flex-col">
            <Creator
              username={user.username}
              profile={user.Profile_photo}
              verification={user.User_verification_status == 1 ? true : false}
              className="!justify-start"
            />
            <span className="flex gap-1">
              <Calender />
              {date}
            </span>
            <span className="flex gap-1">
              <Avatars />
              {RegisteredUserCount} kayıtlı kullanıcı
            </span>
            <span className="flex gap-1">
              <AvatarTick />
              {CompletedUserCount} tamamlayan kullanıcı
            </span>
          </div>
          <p>{description}</p>
          <div className="flex gap-2">
            {isJoined ? (
              <>
                <Link
                  href={"/play/" + url}
                  className="px-4 py-2 rounded-full font-medium text-indigo-600 border border-indigo-600 active:scale-95 hocus:ring hocus:ring-indigo-600/50 hocus:bg-indigo-600 hocus:text-neutral-200 transition-all"
                >
                  Başla
                </Link>
                {/* <span className="px-4 py-2 rounded-full font-medium text-neutral-200 border border-emerald-600 bg-emerald-600">
                  Tamamlandı
                </span>
                <span className="px-4 py-2 rounded-full font-medium border border-amber-600 text-amber-600">
                  %28 tamamlandı
                </span> */}
              </>
            ) : (
              <button
                onClick={JoinTheList}
                className="px-4 py-2 rounded-full font-medium text-indigo-600 border border-indigo-600 disabled:opacity-50"
              >
                Katıl
              </button>
            )}

            {/* <button className="p-2 rounded-full font-medium text-red-600 border !border-red-600 hocus:ring-red-600/50">
              <Bookmark />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListContent({ words }) {
  return (
    <div className="flex flex-col bg-neutral-200/50 p-1 gap-1 rounded-lg border border-neutral-200 mb-2 animate-loaded">
      {JSON.parse(words).length > 0 ? (
        JSON.parse(words).map((word, index) => (
          <WordContent word={word} index={index} />
        ))
      ) : (
        <p>İçerik Yok</p>
      )}
    </div>
  );
}

function WordContent({ index, word }) {
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
              <span className="">
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
