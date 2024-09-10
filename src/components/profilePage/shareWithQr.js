import Qr from "@/assets/icons/qr";
import { useState } from "react";
import Image from "next/image";
import VerificationBadge from "@/assets/icons/verificationBadge";
import { QRCodeSVG } from "qrcode.react";
import Copy from "@/assets/icons/copy";

export default function ShareWithQr({
  id,
  banner,
  profile,
  username,
  fullname,
  verification,
}) {
  const [isOpenned, setIsOpenned] = useState(false);

  const toggleOpened = () => {
    setIsOpenned(!isOpenned);
  };

  const copyClipboard = () => {
    navigator.clipboard.writeText("https://pelavor.com/q/" + id);
  };

  return (
    <>
      <button
        onClick={toggleOpened}
        className="flex gap-2 p-2 rounded-lg bg-neutral-200 text-neutral-700"
      >
        <Qr />
      </button>
      {isOpenned ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 min-w-full h-screen min-h-[700px] bg-neutral-800/50 backdrop-blur flex items-center justify-center z-50 overflow-auto">
          <div className="p-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-red-500 rounded-3xl">
            <div className="shadow-lg flex flex-col gap-2 p-4 bg-neutral-200 rounded-2xl items-center justify-center max-w-full max-h-full overflow-auto">
              <Image
                src={banner}
                width={396}
                height={144}
                className="max-w-96 w-full h-36 rounded-xl object-cover border-2 border-neutral-300 shadow"
              />
              <Image
                src={profile}
                width={96}
                height={96}
                className="max-w-24 h-24 w-full rounded-full border-2 border-neutral-300 mt-[-56px] shadow"
              />
              <div className="flex flex-col items-center gap-1">
                <span className="font-medium text-sm text-neutral-700">
                  @{username}
                </span>
                <span className="font-bold text-xl text-neutral-900 flex items-center gap-2">
                  {fullname}
                  {verification ? (
                    <VerificationBadge className="w-6 h-6" />
                  ) : null}
                </span>
              </div>
              <QRCodeSVG
                value={"http://localhost:3000/user/" + username}
                size={256}
                bgColor={"#e5e5e5"}
                fgColor={"#171717"}
                level={"L"}
                includeMargin={false}
                className="mb-4 mt-4 min-w-64 min-h-64 block"
              />
              <button
                onClick={copyClipboard}
                className="p-2 gap-2 border border-neutral-700 text-neutral-700 rounded-lg flex w-full"
              >
                <Copy />
                {"https://pelavor.com/q/" + id}
              </button>
              <button
                onClick={toggleOpened}
                className="p-2 gap-2 border !border-red-600 hocus:ring-red-600/50 text-red-600 rounded-lg flex w-full items-center justify-center"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
