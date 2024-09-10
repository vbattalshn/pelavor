import React from "react";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";
import Image from "next/image";
import Calendar from "../calendar";
import ShareWithQr from "./shareWithQr";

export default function UserTags({ userData }) {
  const location = userData.Location ? JSON.parse(userData.Location) : null;
  const accounts = userData.Accounts ? JSON.parse(userData.Accounts) : [];

  return (
    <div className="flex gap-2 p-4 sm:flex-row flex-col">
      {location ? (
        <div className="flex gap-2 p-2 rounded-lg bg-neutral-200">
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

      <div className="flex gap-2 p-2 rounded-lg bg-neutral-200 text-neutral-700">
        <Calendar />
        {userData.Registration_date}
      </div>

      {accounts.length > 0 &&
        accounts.map((account, index) => (
          <Link
            key={index}
            href={account.url}
            target="_blank"
            className="flex gap-2 p-2 rounded-lg bg-neutral-200 text-neutral-700"
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
        <ShareWithQr id={userData.Profile_qr_id} banner={userData.Profile_banner} profile={userData.Profile_photo} verification={userData.User_verification_status} username={userData.username} fullname={userData.fullname} />
    </div>
  );
}
