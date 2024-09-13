import Logo from "@/assets/logo";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import MenuIcon from "@/assets/icons/menuIcon";
import { useRouter } from "next/router";

export default function Header() {
  const [isLoggined, setIsLoggined] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  var links = [
    {
      id: 1,
      href: "https://blog.pelavor.com/",
      label: "Blog",
    },
    {
      id: 2,
      href: "/hot-lists",
      label: "Popüler Listeler",
    },
    {
      id: 3,
      href: "/podcast",
      label: "Podcast",
    },
  ];

  useEffect(() => {
    if(Cookies.get("user_data")){
      setIsLoggined(true);
      setUserData(JSON.parse(Cookies.get("user_data")));
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col sticky top-0 bg-slate-300/25 backdrop-blur z-10">
      <header className="max-w-5xl w-full p-2 items-center justify-between sm:flex hidden">
        <Link href="/">
          <Logo color="#202020" />
        </Link>
        <Navigation links={links} />
        {!isLoggined ? (
          <SignInBtn className="rounded-full" />
        ) : (
          <UserMenu userData={userData} className="rounded-full" />
        )}
      </header>
      <header className="sm:hidden flex items-center justify-between p-2 w-full">
        <Logo color="#202020" />
        <MobileMenu isLoggined={isLoggined} links={links} userData={userData} />
      </header>
    </div>
  );
}

function MobileMenu({ links, isLoggined, userData }) {
  return (
    <Menu>
      <MenuButton>
        <span className="p-2 hocus:bg-neutral-200 active:bg-neutral-200 rounded-lg block ">
          <MenuIcon />
        </span>
      </MenuButton>
      <MenuItems
        className="p-2 bg-neutral-200 rounded-lg flex flex-col gap-1 shadow border-neutral-300 z-20"
        anchor="bottom end"
      >
        {links.map((link) => (
          <MenuItem key={link.id}>
            <Link
              className="py-2 px-4 hocus:bg-neutral-300 rounded-md transition-all hocus:underline "
              href={link.href}
            >
              {link.label}
            </Link>
          </MenuItem>
        ))}
        <MenuItem>
          {!isLoggined ? (
            <SignInBtn className="rounded-md" />
          ) : (
            <UserMenu userData={userData} className="rounded-md" />
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

function AvatarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor" clipPath="url(#clip0_57_147)">
        <path d="M16.5 9a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path>
        <path
          fillRule="evenodd"
          d="M0 12a12 12 0 1124 0 12 12 0 01-24 0zM12 1.5a10.5 10.5 0 00-8.202 17.055C4.863 16.839 7.208 15 12 15c4.793 0 7.136 1.837 8.202 3.555A10.5 10.5 0 0012 1.5z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_57_147">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function Navigation({ links, col = false }) {
  return (
    <nav className="flex items-center justify-center ${col ? 'flex-col' : ''}">
      <ul className="flex gap-4 font-medium text-neutral-700">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className="hocus:underline hocus:text-neutral-900 transition active:scale-95"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SignInBtn({ className }) {
  return (
    <Link
      href="/login"
      className={
        "signin-btn flex p-2 pr-4 font-medium gap-2 text-indigo-600 border border-indigo-600 hocus:bg-indigo-600 hocus:text-neutral-200 transition-all " +
        className
      }
    >
      <AvatarIcon />
      <span>Sign In</span>
    </Link>
  );
}

function UserMenu({ className, userData }) {
  var links = [
    {
      id: 0,
      href: "/dashboard",
      label: "Dashboard",
      class: "",
    },
    {
      id: 1,
      href: "/dashboard/settings",
      label: "Settings",
      class: "",
    },
    {
      id: 2,
      href: "/user/" + userData.username,
      label: "Your Profile",
      class: "",
    },
    {
      id: 3,
      href: "/logout",
      label: "Logout",
      class: "hocus:!bg-red-600 hocus:!text-neutral-200",
    },
  ];
  return (
    <Menu>
      <MenuButton
        className={
          "flex p-2 pr-4 font-medium gap-2 text-indigo-600 border border-indigo-600 hocus:bg-indigo-600 hocus:text-neutral-200 transition-all " +
          className
        }
      >
        <Image
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
          alt={userData.username + " avatar"}
          src={userData.profile_photo}
        />
        <span>{userData.username}</span>
        <MenuIcon />
      </MenuButton>
      <MenuItems
        className="p-2 bg-neutral-200 rounded-lg flex flex-col gap-1 shadow border border-neutral-200 z-20"
        anchor="bottom end"
      >
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={
              "py-2 px-4 hocus:bg-neutral-300/50 rounded-md transition-all " +
              link.class
            }
          >
            {link.label}
          </Link>
        ))}
      </MenuItems>
    </Menu>
  );
}
