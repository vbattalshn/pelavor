import React from "react";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import Image from "next/image";
import Calendar from "../calendar";
import ShareWithQr from "./shareWithQr";
import PelavorPoint from "../../assets/icons/pelavorPoint";

export default function UserTags({ userData }) {
  const location = userData.Location ? JSON.parse(userData.Location) : null;
  const accounts = userData.Accounts ? JSON.parse(userData.Accounts) : [];

  const formatPoints = (points) => {
    if (points >= 1000000) {
      return (points / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (points >= 1000) {
      return (points / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return points;
    }
  };

  return (
    <div className="gap-2 p-4">
      {location ? (
        <div className="inline-flex mr-2 mb-2 gap-2 p-2 rounded-lg bg-neutral-200">
          <ReactCountryFlag
            countryCode={location.countryCode}
            svg
            style={{
              width: "32px",
              height: "24px",
              borderRadius: "4px",
            }}
            title={location.country}
          />
          {location.country}
        </div>
      ) : null}

      <div className="inline-flex mr-2 mb-2 gap-2 p-2 rounded-lg bg-neutral-200 text-neutral-700">
        <Calendar />
        {userData.Registration_date}
      </div>

      <div
        className={` inline-flex mr-2 mb-2 gap-2 p-2 rounded-lg ${
          userData.pelavor_point >= 10000
            ? "bg-goldBg font-black text-neutral-800"
            : userData.pelavor_point >= 5000
            ? "bg-silverBg font-bold text-neutral-700"
            : userData.pelavor_point >= 1000
            ? "bg-bronzeBg font-medium text-neutral-200"
            : "bg-neutral-200 font-normal text-neutral-600"
        }`}
      >
        <PelavorPoint className="w-6 h-6 " />
        {formatPoints(userData.pelavor_point)} Pelavor Puanı
      </div>

      {accounts.length > 0 &&
        accounts.map((account, index) => (
          <Link
            key={index}
            href={account.url}
            target="_blank"
            className="inline-flex mr-2 mb-2 gap-2 p-2 rounded-lg bg-neutral-200 text-neutral-700"
          >
            <Image
              src={account.iconUrl}
              width={24}
              height={24}
              className="w-6 h-6 rounded"
              alt={`Icon for ${account.url}`}
            />
          </Link>
        ))}
      <ShareWithQr
        id={userData.Profile_qr_id}
        banner={userData.Profile_banner}
        profile={userData.Profile_photo}
        verification={userData.User_verification_status}
        username={userData.username}
        fullname={userData.fullname}
      />
    </div>
  );
}
