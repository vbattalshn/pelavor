import Footer from "@/components/footer";
import Header from "@/components/header";
import VerificationBadge from "@/assets/icons/verificationBadge";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import More from "@/assets/icons/more";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import apiClient from "@/lib/api";
import toast from "react-hot-toast";
import UserTags from "@/components/profilePage/userTags";
import PageFilter from "@/components/page/filter";
import ListCard from "@/components/listCard";
import Head from "next/head";
import ListCardLoading from "@/components/listCardLoading";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await axios({
      baseURL: "https://api.pelavor.com/get-user-page-data",
      method: "post",
      headers: {
        Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
        "Content-Type": "application/json",
      },
      data: {
        username: slug,
      },
    });

    const lists = await axios({
      baseURL: "https://api.pelavor.com/get-user-lists",
      method: "post",
      headers: {
        Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
        "Content-Type": "application/json",
      },
      data: {
        username: slug,
        order: "created_date",
      },
    });

    const userData = response.data.data;
    const userLists = lists.data.data;

    return {
      props: {
        userData,
        userLists,
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
        userData: null,
        userLists: [],
      },
    };
  }
}

const User = ({ userData, userLists }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {userData.fullname + " - " + userData.username + " | Pelavor"}
        </title>
        <meta
          name="title"
          content={userData.fullname + " - " + userData.username + " | Pelavor"}
        />
        <meta name="description" content={userData.Profile_biography} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={"https://pelavor.com/user/" + userData.username}
        />
        <meta
          property="og:title"
          content={userData.fullname + " - " + userData.username + " | Pelavor"}
        />
        <meta property="og:description" content={userData.Profile_biography} />
        <meta property="og:image" content={userData.Profile_photo} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://pelavor.com/user/" + userData.username}
        />
        <meta
          property="twitter:title"
          content={userData.fullname + " - " + userData.username + " | Pelavor"}
        />
        <meta
          property="twitter:description"
          content={userData.Profile_biography}
        />
        <meta property="twitter:image" content={userData.Profile_photo} />
      </Head>
      <Header />
      <UserPageHead
        username={router.query.slug}
        userData={userData}
        userLists={userLists}
      />
      <Footer />
    </>
  );
};

const UserPageHead = ({ username, userData, userLists }) => {
  const [showFollowBtn, setShowFollowBtn] = useState(true);
  const [isFollowed, setIsFollowed] = useState(userData.isFollowed);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setShowFollowBtn(false);
    const session = Cookies.get("session");
    if (session != undefined) {
      if (JSON.parse(Cookies.get("user_data")).username != userData.username) {
        setShowFollowBtn(true);
      }
    }
  }, []);

  const follow = () => {
    const data = {
      username: username,
    };

    apiClient
      .post("/follow", data)
      .then((response) => {
        setIsFollowed(true);
        userData.follower_Count = userData.follower_Count + 1;
      })
      .catch((e) => {
        console.error("Error fetching list data:", e);
        toast.error(e.response?.data?.message || "Bir hata oluştu");
      });
  };

  const unfollow = () => {
    const data = {
      username: username,
    };

    apiClient
      .post("/unfollow", data)
      .then((response) => {
        setIsFollowed(false);
        userData.follower_Count = userData.follower_Count - 1;
      })
      .catch((e) => {
        console.error("Error fetching list data:", e);
        toast.error(e.response?.data?.message || "Bir hata oluştu");
      });
  };

  return (
    <div className="max-w-5xl mx-auto py-2 animate-loaded">
      <Image
        src={userData.Profile_banner}
        width={1024}
        height={256}
        className="w-full h-64 rounded-2xl object-cover border-2 border-neutral-300"
        alt="Profile Banner"
      />
      <div className="flex gap-2 px-2 mt-[-50px] items-center justify-between sm:flex-row flex-col">
        <div className="flex gap-2 items-center sm:flex-row flex-col">
          <Image
            src={userData.Profile_photo}
            alt={userData.username + " profile photo"}
            width={400}
            height={400}
            className="w-[200px] h-[200px] rounded-full object-cover border-2 border-neutral-300"
            onClick={() => setShowPreview(true)}
          />
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm text-neutral-700 sm:text-start text-center">
              @{userData.username}
            </span>
            <span className="font-bold text-2xl text-neutral-900 flex items-center gap-2 ">
              {userData.fullname}
              {userData.User_verification_status ? (
                <VerificationBadge classname="w-8 h-8" />
              ) : null}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {showFollowBtn ? (
            isFollowed ? (
              <button
                onClick={unfollow}
                className="px-3 py-2 rounded-lg border border-indigo-600 text-indigo-600 hocus:bg-indigo-600 hocus:text-neutral-200 transition-all"
              >
                Takibi Bırak
              </button>
            ) : (
              <button
                onClick={follow}
                className="px-3 py-2 rounded-lg border border-transparent bg-indigo-600 text-neutral-200 hocus:bg-indigo-600/10 hocus:text-indigo-600 hocus:border-indigo-600 transition-all"
              >
                Takip Et
              </button>
            )
          ) : null}

          <Menu>
            <MenuButton className="p-3 rounded-lg bg-neutral-200/50 border border-neutral-200 text-neutral-800">
              <More />
            </MenuButton>
            <MenuItems
              className="p-1 mt-1 bg-neutral-200/50 rounded-lg flex flex-col gap-1 border border-neutral-200 z-20"
              anchor="bottom end"
            >
              <MenuItem>
                <button
                  className="p-2 px-4 hocus:bg-neutral-300/50 rounded-md transition-all hocus:underline"
                  href="#"
                >
                  Kulanıcıyı engelle
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="p-2 px-4 hocus:bg-neutral-300/50 rounded-md transition-all hocus:underline"
                  href="#"
                >
                  Şikayet Et
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div className="flex gap-8 p-4 text-neutral-700 sm:flex-row flex-col">
        <p className="flex-1 sm:text-start text-center">
          {userData.Profile_biography}
        </p>
        <div className="flex gap-4 sm:w-auto w-full justify-center">
          <div className="flex flex-col gap-2 items-center">
            <span className="font-extrabold text-2xl text-neutral-800">
              {userData.user_list_count}
            </span>
            <span>Liste</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="font-extrabold text-2xl text-neutral-800">
              {userData.follower_Count}
            </span>
            <span>Takipçi</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="font-extrabold text-2xl text-neutral-800">
              {userData.followed_Count}
            </span>
            <span>Takip</span>
          </div>
        </div>
      </div>
      <UserTags userData={userData} />
      <UserLists userLists={userLists} username={username} />
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        className="relative z-50"
      >
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center p-4 bg-neutral-700/50 backdrop-blur-sm z-50">
          <DialogPanel className="rounded-full">
            <Image
              src={userData.Profile_photo}
              alt={userData.username + " profile photo"}
              width={400}
              height={400}
              className="w-[400px] h-[400px] rounded-full object-cover"
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

const UserLists = ({ username, userLists }) => {
  const [lists, setLists] = useState(userLists);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("created_date");

  useEffect(() => {
    getLists();
  }, [order]);

  function getLists() {
    setLoading(true);
    var data = {
      username,
      order,
    };

    apiClient
      .post("/get-user-lists", data)
      .then((response) => {
        setLists(response.data?.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Bir Hata Oluştu.");
      })
      .finally(() => setLoading(false));
  }
  return (
    <>
      {lists.length > 0 && loading == false ? (
        <PageFilter setOrder={setOrder} />
      ) : null}
      <div className="max-w-5xl w-full mx-auto place-items-center grid grid-cols-auto-fit gap-3 p-2 items-center justify-center">
        {lists.length > 0 && loading == false ? (
          lists.map((list, index) => (
            <ListCard
              key={index}
              title={list.title}
              description={list.description}
              image={list.image}
              date={list.created_date}
              user={list.user}
              url={list.url}
            />
          ))
        ) : (
          <>{lists.length > 0 ? <ListsLoading /> : "Oluşturulmuş liste yok"}</>
        )}
      </div>
    </>
  );
};

const ListsLoading = () => {
  return (
    <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
      <ListCardLoading />
      <ListCardLoading />
      <ListCardLoading />
    </div>
  );
}

export default User;
