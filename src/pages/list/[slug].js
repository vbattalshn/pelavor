import Footer from "@/components/footer";
import Header from "@/components/header";
import Creator from "@/components/creator";
import UnderConstruction from "@/components/underConstruction";
import GetComments from "@/components/comments/comments";
import AddComment from "@/components/comments/addComment";
import WordContent from "@/components/wordContent";

import Calender from "@/components/calendar";
import Avatars from "@/assets/icons/avatars";
import AvatarTick from "@/assets/icons/avatarTick";

import apiClient from "@/lib/api";

import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Head from "next/head";
import cookie from "cookie";
import Link from "next/link";
import Cookies from "js-cookie";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const { req } = context;

  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    let response = null;

    if (cookies.session) {
      response = await axios({
        baseURL: "https://api.pelavor.com//get-list",
        method: "post",
        headers: {
          Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
          "Content-Type": "application/json",
          "x-user-token": cookies.session,
        },
        data: {
          url: slug,
        },
      });
    } else {
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

    toast.error(error.response?.data?.message || "Bir hata oluştu");

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
        <meta
          property="twitter:url"
          content={"https://pelavor.com/list/" + url}
        />
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
        progress={listData.progress}
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
  progress,
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
              progress === 0 ? (
                <Link
                  href={"/play/" + url}
                  className="px-4 py-2 rounded-full font-medium text-indigo-600 border border-indigo-600 active:scale-95 hocus:ring hocus:ring-indigo-600/50 hocus:bg-indigo-600 hocus:text-neutral-200 transition-all"
                >
                  Başla
                </Link>
              ) : progress === 100 ? (
                <span className="px-4 py-2 rounded-full font-medium text-neutral-200 border border-emerald-600 bg-emerald-600">
                  Tamamlandı
                </span>
              ) : (
                <Link
                  href={"/play/" + url}
                  className="px-4 py-2 rounded-full font-medium border border-amber-400 text-neutral-600 relative overflow-hidden hocus:ring hocus:ring-amber-400/50 transition-all "
                >
                  <span
                    className="w-full h-full absolute top-0 left-0 block bg-amber-400 z-0"
                    style={{ width: progress + "%" }}
                  ></span>
                  <span className="block z-10 relative">
                    %{progress} tamamlandı devam et
                  </span>
                </Link>
              )
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
  const [isLoggined, setIsLoggined] = useState(false);

  useEffect(() => {
    if (Cookies.get("user_data")) {
      setIsLoggined(true);
    }
  }, [Cookies]);

  return (
    <div className="flex flex-col bg-neutral-200/50 p-1 gap-1 rounded-lg border border-neutral-200 mb-2 animate-loaded">
      {JSON.parse(words).length > 0 ? (
        JSON.parse(words).map((word, index) => (
          <WordContent word={word} index={index} />
        ))
      ) : (
        <p>İçerik Yok</p>
      )}
      {!isLoggined ? (
        <Link href="/login" className="p-2 text-center bg-amber-400 rounded-md text-neutral-800 font-semibold">Tüm içeriği görebilmek için giriş yapmalısınız</Link>
      ) : null}
    </div>
  );
}

function Comments({ url }) {
  const [refreshTurn, setRefreshTurn] = useState(0);
  return (
    <div className="flex flex-col gap-2 py-2">
      <GetComments url={url} refresh={refreshTurn} />
      <AddComment url={url} refresh={refreshTurn} setRefresh={setRefreshTurn} />
    </div>
  );
}

export default List;
