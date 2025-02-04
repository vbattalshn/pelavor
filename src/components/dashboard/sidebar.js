import React from "react";
import Logo from "@/assets/logo";
import Link from "next/link";

import Lists from "@/assets/icons/lists";
import CreateList from "@/assets/icons/createList";
import Comments from "@/assets/icons/comments";
import UserSettings from "@/assets/icons/userSettings";
import Badges from "@/assets/icons/badges";
import Gift from "@/assets/icons/gift";
import Messages from "@/assets/icons/messages";
import Logout from "@/assets/icons/logout";
import SidebarArrow from "@/components/sidebarArrow";
import MenuIcon from "@/assets/icons/menuIcon";

import Wallet from "@/assets/icons/wallet";
import Bill from "@/assets/icons/bill";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useAutoAnimate } from '@formkit/auto-animate/react'
import RegisteredList from "@/assets/icons/registeredList";

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const [littleMenu, setLittleMenu] = useState(false);
  const [parent] = useAutoAnimate()
  const [isAdmin, setAdmin] = useState(false);
  const [userStatusData, setUserStatusData] = useState([]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMenuWeight = () => {
    Cookies.set("sidebarLittleMenu", !littleMenu)
    setLittleMenu(!littleMenu);
  };

  useEffect(() => {
    setLittleMenu(Cookies.get("sidebarLittleMenu") == "true" ? true : false)
  }, [])
  
  Cookies.get("status")
  useEffect(() => {
    setAdmin(Cookies.get("status") == 5 ? true : false);
  }, [Cookies.get("status")]);

  const ListNav = [
    {
      id: 0,
      icon: <Lists />,
      label: "Listelerin",
      url: "/dashboard/lists",
      disabled: false,
    },
    {
      id: 1,
      icon: <CreateList />,
      label: "Liste Oluştur",
      url: "/dashboard/create-list",
      disabled: false,
    },
    {
      id: 2,
      icon: <Comments />,
      label: "Listelerine Gelen Yorumlar",
      url: "/dashboard/comments",
      disabled: true,
    },
  ];

  const UserPay = [
    {
      id: 0,
      icon: <Wallet />,
      label: "Kartların",
      url: "/dashboard/cards",
      disabled: true,
    },
    {
      id: 1,
      icon: <Bill />,
      label: "Faturlar",
      url: "/dashboard/bills",
      disabled: true,
    }
  ]

  const UserNav = [
    {
      id: 0,
      icon: <UserSettings />,
      label: "Hesap Ayarları",
      url: "/dashboard/settings",
      disabled: false,
    },
    {
      id: 1,
      icon: <RegisteredList />,
      label: "Kayıt Olduğun Listeler",
      url: "/dashboard/registered-lists",
      disabled: false,
    },
    {
      id: 2,
      icon: <Badges />,
      label: "Rozetlerin",
      url: "/dashboard/badges",
      disabled: true,
    },
    {
      id: 2,
      icon: <Messages />,
      label: "Mesajlar",
      url: "/dashboard/messages",
      disabled: false,
    },
  ];

  const SiteNav = [
    {
      id: 0,
      icon: <Gift />,
      label: "Güncellemeler",
      url: "/dashboard/updates",
      disabled: true,
    },
  ];

  const AdminNav = [
    {
      id: 0,
      icon: <Gift />,
      label: "Kullanıcılar",
      url: "/dashboard/admin/users",
      disabled: false,
    },
  ];

  return (
    <div ref={parent} className={"lg:max-w-80 max-w-auto w-full flex flex-col gap-2 sticky " + (littleMenu ? "!max-w-auto !w-auto" : null)}>
      <SidebarHead
        toggleMenu={toggleMenu}
        toggleMenuWeight={toggleMenuWeight}
        className={"text-neutral-800 flex justify-between gap-2 p-2 " + (littleMenu ? " !p-0 !justify-center" : "")}
        littleMenu={littleMenu}
      />
      <nav
        className={
          "flex gap-1 flex-col " + (showMenu ? "lg:flex hidden" : null)
        }
      >
        {ListNav.map((list) => (
          <SidebarList
            key={list.id}
            label={list.label}
            url={list.url}
            icon={list.icon}
            disabled={list.disabled}
            littleMenu={littleMenu}
          />
        ))}
        <Line />
        {UserPay.map((list) => (
          <SidebarList
            key={list.id}
            label={list.label}
            url={list.url}
            icon={list.icon}
            disabled={list.disabled}
            littleMenu={littleMenu}
          />
        ))}
        <Line />
        {isAdmin == true ? AdminNav.map((list) => (
          <>
          <SidebarList
            key={list.id}
            label={list.label}
            url={list.url}
            icon={list.icon}
            disabled={list.disabled}
            littleMenu={littleMenu}
          />
          <Line />
          </>
        )) : null}
        {UserNav.map((list) => (
          <SidebarList
            key={list.id}
            label={list.label}
            url={list.url}
            icon={list.icon}
            disabled={list.disabled}
            littleMenu={littleMenu}
          />
        ))}
        <Line />
        {SiteNav.map((list) => (
          <SidebarList
            key={list.id}
            label={list.label}
            url={list.url}
            icon={list.icon}
            disabled={list.disabled}
            littleMenu={littleMenu}
          />
        ))}
        <Line />
        <SidebarList
          label="Çıkış Yap"
          url="/logout"
          icon={<Logout />}
          className="!bg-red-600/10 !text-red-600 !border-red-600 hocus:ring-red-600/50"
          littleMenu={littleMenu}
        />
      </nav>
    </div>
  );
}

function SidebarHead({ className, toggleMenu, toggleMenuWeight, littleMenu }) {
  return (
    <div className={className}>
      {littleMenu == false ? (
        <Link href="/">
          <Logo />
        </Link>
      ) : null}
      <button
        onClick={toggleMenuWeight}
        className="p-1 bg-neutral-300 rounded-lg text-neutral-700 lg:block hidden"
      >
        <SidebarArrow classname={(littleMenu ? " rotate-180 " : null) + " transition-all"} />
      </button>
      <button
        onClick={toggleMenu}
        className="p-1 bg-neutral-300 rounded-lg text-neutral-700 lg:hidden block"
      >
        <MenuIcon />
      </button>
    </div>
  );
}

function SidebarList({
  label,
  url,
  icon,
  disabled = false,
  className = " ",
  littleMenu,
}) {
  return (
    <Link
      className={
        "flex gap-2 p-2 font-medium text-neutral-800 hocus:bg-indigo-600/10 border border-transparent hocus:border-indigo-600 hocus:text-indigo-600 hocus:pl-4 focus:ring focus:ring-indigo-600/50 focus:outline-none transition-all rounded-lg disabled:opacity-50 " + className + (disabled ? " opacity-50 cursor-not-allowed hocus:ring-0 hocus:bg-neutral-200/10 hocus:text-neutral-800 hocus:border-transparent " : " " ) +  (littleMenu ? " justify-center !pl-2" : "")}
      href={disabled ? "#" : url}
    >
      {icon}

      {littleMenu == false ? <span>{label}</span> : null}
    </Link>
  );
}

function Line() {
  return <hr className="w-full h-1 mt-2 mb-2 bg-neutral-300/50 rounded-lg" />;
}
