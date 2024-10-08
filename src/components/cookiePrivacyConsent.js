import { useState, useEffect } from "react";
import Button from "./button";
import Cookies from "js-cookie";

export default function CookiePrivacyConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Cookies.get("Cookie_Privacy_Consent") !== "true") {
      setShow(true);
    }
  }, []);

  const Accept = () => {
    Cookies.set("Cookie_Privacy_Consent", true);
    setShow(false)
  }

  return (
    <>
      {show ? (
        <div className="fixed right-0 bottom-0 max-w-96 m-4 p-4 rounded-xl flex flex-col gap-2 bg-neutral-300/50 backdrop-blur-xl text-neutral-800 font-medium justify-center items-end animate-loaded">
          <span className="w-full items-start text-xl font-bold">
            Çerezler & Güvenlik
          </span>
          <span>
            Pelavor.com deneyiminizi kişiselleştirmek, site trafiğimizi analiz
            etmek ve hizmetlerimizi iyileştirmek amacıyla çerezler
            kullanmaktadır.
          </span>
          <Button onClick={Accept} label="Tamam" className="rounded-lg" />
        </div>
      ) : null}
    </>
  );
}
