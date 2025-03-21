import Logo from "@/assets/logo";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Script from 'next/script';

export default function ad1() {
  const [premium, setPremium] = useState(false);
  const [preData, setPreData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if(Cookies.get("user_data")){
      setPreData(JSON.parse(Cookies.get("user_data")));
    }else{
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setPremium(preData.premium_status ? true : false);
  }, [preData]);

  return (
    <>
      {premium == 0 && (
        <>
          <span>Reklam</span>
        </>
      )}
    </>
  );
}
