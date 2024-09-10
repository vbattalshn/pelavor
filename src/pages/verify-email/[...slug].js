import apiClient from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import Header from "@/components/header";
import Exclamation from "@/assets/icons/exclamation";
import Check from "@/assets/icons/check";
import Cookies from "js-cookie";
import Head from "next/head";
import EmailX from "@/assets/icons/emailx";
import EmailOk from "@/assets/icons/emailOk";

export default function ResetPassword() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = Cookies.get("session");

    if(session != undefined){
      router.push("/logout?r=" + window.location.href)
    }
  })

  useEffect(() => {
    if (!router.isReady) return;

    const { slug } = router.query;

    if (!slug || slug.length < 3) {
      router.push("/404");
      return;
    }

    const requestData = {
      data1: slug[0],
      data2: slug[1],
      data3: slug[2],
    };

    apiClient
      .post("/verify-email", requestData)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.response?.data?.message || "Bir hata oluştu");
        setError(true);
      })
      .finally(() => {
        setLoading(false)
        setTimeout(() => {
          //router.push("/login");
        }, 7000);
      });
  }, [router.isReady, router.query]);

  return (
    <div>
      <Header />
      <Head>
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#f5f5f5" />
        <meta name="msapplication-TileColor" content="#202020" />
        <meta name="theme-color" content="#f5f5f5" />
      </Head>

      {loading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center gap-2 flex-col bg-slate-800/50 backdrop-blur text-neutral-200 z-50">
          <Spinner className="w-8 h-8" />
          Email adresiniz doğrulanıyor...
        </div>
      ) : (
        error ? (
          <div className="w-full h-content flex items-center justify-center flex-col gap-4">
            <div className="relative">
              <span className="w-full h-full bg-red-500/50 rounded-full absolute block animate-pulse -z-10" />
              <div className="p-3 m-2 bg-red-500 rounded-full z-10">
                <EmailX />
              </div>
            </div>
            <h2 className="font-semibold text-neutral-800 text-xl">
              Email Onaylanamadı
            </h2>
            <span className="font-normal text-neutral-700">
              {message}
            </span>
          </div>
        ) : (

          <div className="w-full h-content flex items-center justify-center flex-col gap-4">
            <div className="relative">
              <span className="w-full h-full bg-green-500/50 rounded-full absolute block animate-pulse -z-10" />
              <div className="p-3 m-2 bg-green-500 rounded-full z-10">
                <EmailOk />
              </div>
            </div>
            <h2 className="font-semibold text-neutral-800 text-xl">
              Email Onaylandı
            </h2>
            <span className="font-normal text-neutral-700">
              {message}
            </span>
          </div>
        )

      )}
    </div>
  );
}
