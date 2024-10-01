import Footer from "@/components/footer";
import Header from "@/components/header";
import Creator from "@/components/creator";
import UnderConstruction from "@/components/underConstruction";
import GetComments from "@/components/comments/comments";
import AddComment from "@/components/comments/addComment";

import Calender from "@/components/calendar";
import Avatars from "@/assets/icons/avatars";
import AvatarTick from "@/assets/icons/avatarTick";
import Arrow from "@/assets/icons/arrow";

import apiClient from "@/lib/api";

import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Head from "next/head";
import cookie from 'cookie';
import Link from "next/link";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const { req } = context;

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    let response = null;

    if (cookies.session) {
      response = await axios({
        baseURL: "https://api.pelavor.com/get-list",
        method: "post",
        headers: {
          Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
          "Content-Type": "application/json",
          "x-user-token": cookies.session
        },
        data: {
          url: slug,
        },
      });
    }else{
      response = await axios({
        baseURL: "https://api.pelavor.com/get-list",
        method: "post",
        headers: {
          Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
          "Content-Type": "application/json",
        },
        data: {
          url: slug,
        },
      });
    }
  
    const listData = response.data.data;

    return {
      props: {
        listData,
        url: slug,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);

    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {
        listData: null,
        url: null,
      },
    };
  }
}

const List = ({ listData, url }) => {
  return (
    <>
      <Head>
        <title>{listData.title} | Pelavor</title>
        <meta name="title" content={listData.title} />
        <meta name="description" content={listData.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://pelavor.com/list/" + url} />
        <meta property="og:title" content={listData.title} />
        <meta property="og:description" content={listData.description} />
        <meta property="og:image" content={listData.image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"https://pelavor.com/list/" + url} />
        <meta property="twitter:title" content={listData.title} />
        <meta property="twitter:description" content={listData.description} />
        <meta property="twitter:image" content={listData.image} />
      </Head>
      <Header />
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
              <Comments url={url} />
            </TabPanel>
            <TabPanel>
              <UnderConstruction />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <Footer />
    </>
  );
};

const ListHead = ({
  image,
  title,
  user,
  date,
  RegisteredUserCount,
  CompletedUserCount,
  description,
  url,
  joined,
}) => {
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
          alt={title + " listenin görsel"}
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
};


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

function Comments({ url }){
  const [refreshTurn, setRefreshTurn] = useState(0)
  return(
    <div className="flex flex-col gap-2 py-2">
      <GetComments url={url} refresh={refreshTurn} />
      <AddComment url={url} refresh={refreshTurn} setRefresh={setRefreshTurn} />
    </div>
  )
}

export default List;
