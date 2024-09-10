import Logo from "@/assets/logo";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ad1() {
    const [premium, setPremium] = useState(false);
    const [preData, setPreData] = useState([]);

    useEffect(() => {
        setPreData(JSON.parse(Cookies.get("user_data")));
    }, [])

    useEffect(() => {
        setPremium(preData.premium_status ? true : false);
    }, [preData])


    return (
        <>
          {!premium && (
            <div className="w-[300px] h-[250px] rounded-lg bg-neutral-200 flex flex-col items-center justify-center gap-6">
              <span>
                <Logo />
              </span>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl font-medium italic text-neutral-700 animate-pulse">
                  Reklam Alanı
                </span>
                <span className="text-xs text-neutral-500">(300x250)</span>
              </div>
            </div>
          )}
        </>
      );
}