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
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import apiClient from "@/lib/api";
import toast from "react-hot-toast";
import UserTags from "@/components/profilePage/userTags";
import PageFilter from "@/components/page/filter";
import ListCard from "@/components/listCard";
import Head from "next/head";
import ListCardLoading from "@/components/listCardLoading";

// Constants
const TEXTS = {
  FOLLOW: "Takip Et",
  UNFOLLOW: "Takibi Bırak",
  BLOCK_USER: "Kullanıcıyı engelle",
  REPORT_USER: "Şikayet Et",
  FOLLOWERS: "Takipçi",
  FOLLOWING: "Takip",
  LISTS: "Liste",
  NO_LISTS: "Oluşturulmuş liste yok",
  ERROR_OCCURRED: "Bir hata oluştu",
  SUCCESS_FOLLOW: "Kullanıcı takip edildi",
  SUCCESS_UNFOLLOW: "Kullanıcı takibi bırakıldı"
};

// API Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.pelavor.com",
  token: process.env.PELAVOR_API_TOKEN || "GG839uzFjVhae7cpW6yqzBq7NvOzOfHY", // Fallback for existing setup
  headers: {
    "Content-Type": "application/json",
  }
};

// Server-side data fetching
export async function getServerSideProps(context) {
  const { slug } = context.params;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const [userResponse, listsResponse] = await Promise.all([
      axios({
        url: `${API_CONFIG.baseURL}/get-user-page-data`,
        method: "post",
        headers: {
          Authorization: `Bearer ${API_CONFIG.token}`,
          ...API_CONFIG.headers,
        },
        data: { username: slug },
      }),
      axios({
        url: `${API_CONFIG.baseURL}/get-user-lists`,
        method: "post",
        headers: {
          Authorization: `Bearer ${API_CONFIG.token}`,
          ...API_CONFIG.headers,
        },
        data: {
          username: slug,
          order: "created_date",
        },
      }),
    ]);

    const userData = userResponse.data.data;
    const userLists = listsResponse.data.data;

    if (!userData) {
      return { notFound: true };
    }

    return {
      props: {
        userData,
        userLists: userLists || [],
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);

    // Handle different error types
    if (error.response?.status === 404) {
      return { notFound: true };
    }

    return {
      props: {
        userData: null,
        userLists: [],
        error: "Kullanıcı verileri yüklenirken hata oluştu",
      },
    };
  }
}

// Main User Component
const User = ({ userData, userLists, error }) => {
  const router = useRouter();

  if (error || !userData) {
    return (
      <>
        <Header />
        <div className="max-w-5xl mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            {error || "Kullanıcı bulunamadı"}
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Geri Dön
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const metaTitle = `${userData.fullname} - ${userData.username} | Pelavor`;
  const metaDescription = userData.Profile_biography || `${userData.fullname} adlı kullanıcının profil sayfası`;
  const metaImage = userData.Profile_photo;
  const metaUrl = `https://pelavor.com/user/${userData.username}`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaUrl} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={metaImage} />
      </Head>
      
      <Header />
      <UserPageContent
        username={router.query.slug}
        userData={userData}
        userLists={userLists}
      />
      <Footer />
    </>
  );
};

// Main Page Content Component
const UserPageContent = ({ username, userData, userLists }) => {
  const [userState, setUserState] = useState({
    followerCount: userData.follower_Count,
    isFollowed: userData.isFollowed,
  });
  const [showFollowBtn, setShowFollowBtn] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if current user can follow this profile
  useEffect(() => {
    const session = Cookies.get("session");
    if (session) {
      try {
        const currentUser = JSON.parse(Cookies.get("user_data"));
        if (currentUser?.username && currentUser.username !== userData.username) {
          setShowFollowBtn(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [userData.username]);

  // Follow/Unfollow handlers
  const handleFollow = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await apiClient.post("/follow", { username });
      setUserState(prev => ({
        ...prev,
        isFollowed: true,
        followerCount: prev.followerCount + 1,
      }));
      toast.success(TEXTS.SUCCESS_FOLLOW);
    } catch (error) {
      console.error("Follow error:", error);
      toast.error(error.response?.data?.message || TEXTS.ERROR_OCCURRED);
    } finally {
      setIsLoading(false);
    }
  }, [username, isLoading]);

  const handleUnfollow = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await apiClient.post("/unfollow", { username });
      setUserState(prev => ({
        ...prev,
        isFollowed: false,
        followerCount: prev.followerCount - 1,
      }));
      toast.success(TEXTS.SUCCESS_UNFOLLOW);
    } catch (error) {
      console.error("Unfollow error:", error);
      toast.error(error.response?.data?.message || TEXTS.ERROR_OCCURRED);
    } finally {
      setIsLoading(false);
    }
  }, [username, isLoading]);

  const handleImageClick = useCallback(() => {
    setShowPreview(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-2 animate-loaded">
      {/* Profile Banner */}
      <div className="relative">
        <Image
          src={userData.Profile_banner}
          width={1024}
          height={256}
          className="w-full h-64 rounded-2xl object-cover border-2 border-neutral-300"
          alt={`${userData.username} profil banner`}
          priority
        />
      </div>

      {/* Profile Header */}
      <div className="flex gap-2 px-2 mt-[-50px] items-center justify-between sm:flex-row flex-col">
        <div className="flex gap-2 items-center sm:flex-row flex-col">
          <div className="relative">
            <Image
              src={userData.Profile_photo}
              alt={`${userData.username} profil fotoğrafı`}
              width={200}
              height={200}
              className="w-[200px] h-[200px] rounded-full object-cover border-4 border-white shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleImageClick}
              priority
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm text-neutral-700 sm:text-start text-center">
              @{userData.username}
            </span>
            <div className="font-bold text-2xl text-neutral-900 flex items-center gap-2 sm:justify-start justify-center">
              {userData.fullname}
              {userData.User_verification_status && (
                <VerificationBadge className="w-8 h-8" />
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showFollowBtn && (
            <button
              onClick={userState.isFollowed ? handleUnfollow : handleFollow}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                userState.isFollowed
                  ? "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent"
              }`}
            >
              {isLoading ? "..." : (userState.isFollowed ? TEXTS.UNFOLLOW : TEXTS.FOLLOW)}
            </button>
          )}

          <Menu>
            <MenuButton className="p-3 rounded-lg bg-neutral-200/50 border border-neutral-200 text-neutral-800 hover:bg-neutral-300/50 transition-colors">
              <More />
            </MenuButton>
            <MenuItems
              className="p-1 mt-1 bg-white rounded-lg flex flex-col gap-1 border border-neutral-200 shadow-lg z-20"
              anchor="bottom end"
            >
              <MenuItem>
                <button className="p-2 px-4 hover:bg-neutral-100 rounded-md transition-colors w-full text-left">
                  {TEXTS.BLOCK_USER}
                </button>
              </MenuItem>
              <MenuItem>
                <button className="p-2 px-4 hover:bg-neutral-100 rounded-md transition-colors w-full text-left">
                  {TEXTS.REPORT_USER}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex gap-8 p-4 text-neutral-700 sm:flex-row flex-col">
        <p className="flex-1 sm:text-start text-center leading-relaxed">
          {userData.Profile_biography || "Henüz bir biyografi eklenmemiş."}
        </p>
        
        <div className="flex gap-6 sm:w-auto w-full justify-center">
          <StatItem 
            count={userData.user_list_count} 
            label={TEXTS.LISTS} 
          />
          <StatItem 
            count={userState.followerCount} 
            label={TEXTS.FOLLOWERS} 
          />
          <StatItem 
            count={userData.followed_Count} 
            label={TEXTS.FOLLOWING} 
          />
        </div>
      </div>

      {/* User Tags */}
      <UserTags userData={userData} />

      {/* User Lists */}
      <UserLists userLists={userLists} username={username} />

      {/* Profile Photo Preview Modal */}
      <ProfilePhotoModal
        isOpen={showPreview}
        onClose={handleClosePreview}
        src={userData.Profile_photo}
        alt={`${userData.username} profil fotoğrafı`}
      />
    </div>
  );
};

// Stat Item Component
const StatItem = ({ count, label }) => (
  <div className="flex flex-col gap-2 items-center">
    <span className="font-extrabold text-2xl text-neutral-800">
      {count.toLocaleString('tr-TR')}
    </span>
    <span className="text-sm">{label}</span>
  </div>
);

// Profile Photo Modal Component
const ProfilePhotoModal = ({ isOpen, onClose, src, alt }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel className="rounded-full">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="w-[400px] h-[400px] rounded-full object-cover"
        />
      </DialogPanel>
    </div>
  </Dialog>
);

// User Lists Component
const UserLists = ({ username, userLists: initialLists }) => {
  const [lists, setLists] = useState(initialLists);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("created_date");

  const fetchLists = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/get-user-lists", {
        username,
        order,
      });
      setLists(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching lists:", error);
      toast.error(TEXTS.ERROR_OCCURRED);
    } finally {
      setLoading(false);
    }
  }, [username, order]);

  useEffect(() => {
    if (order !== "created_date") {
      fetchLists();
    }
  }, [order, fetchLists]);

  const hasLists = lists && lists.length > 0;

  return (
    <>
      {hasLists && !loading && <PageFilter setOrder={setOrder} />}
      
      <div className="max-w-5xl w-full mx-auto place-items-center grid grid-cols-auto-fit gap-3 p-2 items-center justify-center">
        {loading ? (
          <ListsLoading />
        ) : hasLists ? (
          lists.map((list) => (
            <ListCard
              key={list.id || list.url}
              title={list.title}
              description={list.description}
              image={list.image}
              date={list.created_date}
              user={list.user}
              url={list.url}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-neutral-600">
            {TEXTS.NO_LISTS}
          </div>
        )}
      </div>
    </>
  );
};

// Loading Component
const ListsLoading = () => (
  <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
    {[...Array(3)].map((_, index) => (
      <ListCardLoading key={index} />
    ))}
  </div>
);

export default User;