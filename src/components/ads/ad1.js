import Logo from "@/assets/logo";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ad1() {
  const [premium, setPremium] = useState(false);
  const [preData, setPreData] = useState([]);

  useEffect(() => {
    setPreData(JSON.parse(Cookies.get("user_data")));
  }, []);

  useEffect(() => {
    setPremium(preData.premium_status ? true : false);
  }, [preData]);

  return (
    <>
      {premium == 0 && (
        <>
          <span>Reklam</span>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1113432847008327"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1113432847008327"
            data-ad-slot={9776836217}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>{" "}
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </>
      )}
    </>
  );
}
