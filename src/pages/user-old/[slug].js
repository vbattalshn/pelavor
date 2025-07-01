import Header from "@/components/header";
import apiClient from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import VerificationBadge from "@/assets/icons/verificationBadge";
import More from "@/assets/icons/more";
import ProfileHeaderLoading from "@/components/profilePage/profileHeaderLoading";
import UserTags from "@/components/profilePage/userTags";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import PageFilter from "@/components/page/filter";
import ListCard from "@/components/listCard";
import Footer from "@/components/footer";
import ListCardLoading from "@/components/listCardLoading";

export default function User() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router.isReady]);
  return (
    <div>
      <Header />
      {loading == false ? (
        <UserPageHead username={router.query.slug} />
      ) : (
        <ProfileHeaderLoading />
      )}
      <Footer />
    </div>
  );
}

function UserPageHead({ username }) {
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggined, setIsLoggined] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const router = useRouter();

  const follow = () => {
    const data = {
      username: username,
    };

    apiClient
      .post("/follow", data)
      .then((response) => {
        setIsFollowed(true);
        userData.follower_Count = userData.follower_Count + 1;
        setUserData(userData);
      })
      .catch((e) => {
        console.error("Error fetching list data:", e);
        toast.error("Bir hata oluştu");
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
        setUserData(userData);
      })
      .catch((e) => {
        console.error("Error fetching list data:", e);
        toast.error("Bir hata oluştu");
      });
  };

  useEffect(() => {
    setLoading(true);

    const data = {
      username: username,
    };

    apiClient
      .post("/get-user-page-data", data)
      .then((response) => {
        setUserData(response.data.data);
        setIsFollowed(
          response.data.data.isFollowed ? response.data.data.isFollowed : false
        );
      })
      .catch((e) => {
        console.error("Error fetching list data:", e);
        if (e.response?.data?.message) {
          toast.error(e.response?.data?.message);
          if (e.response?.data?.status == "404") {
            router.push("/404");
          }
        }
      })
      .finally(() => setLoading(false));

    const session = Cookies.get("session");
    setIsLoggined(session != undefined ? true : false);
    if (session != undefined) {
      setCurrentUser(JSON.parse(Cookies.get("user_data")));
    }
  }, []);

  return loading == false ? (

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
                <VerificationBadge className="w-8 h-8" />
              ) : null}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {isLoggined && currentUser.username != userData.username ? (
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
      <UserLists username={userData.username} />
    </div>
    ) : (
    <ProfileHeaderLoading />
  );
}

function UserLists({ username }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("created_date");

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    getLists();
  }, [order]);

  function getLists() {
    setLoading(true);
    var data = { 
      username,
      order
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
      <PageFilter setOrder={setOrder} />
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
          <>
          {loading == true ? <ListsLoading /> : "Oluşturulmuş liste yok"}
          </>
        )}
      </div>
    </>
  );
}


const ListsLoading = () => {
  return (
    <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
      <ListCardLoading />
      <ListCardLoading />
      <ListCardLoading />
    </div>
  );
}