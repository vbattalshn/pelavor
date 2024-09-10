import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/header";
import Link from "next/link";

export default function Custom404() {
  const router = useRouter();
  const [referer, setReferer] = useState('');

  useEffect(() => {
    if (document.referrer && document.referrer !== window.location.href) {
      setReferer(document.referrer);
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex items-center justify-start pt-48 gap-3 flex-col bg-notFoundImage bg-cover fixed top-0 bg-center">
        <h1 className="font-black text-neutral-900 text-8xl tracking-tighter animate-shake [text-shadow: 3px 3px 5px #00000080]">404</h1>
        <p className="font-medium text-neutral-700 text-center">Aradığın kelimeyi, listeyi, kullanıcıyı veya sayfayı bulamadık</p>
        <div className="flex gap-2 items-center justify-center">
          <Link className="px-3 py-2 rounded-lg text-neutral-800 bg-neutral-200 border border-neutral-700 backdrop-blur hover:bg-neutral-300 transition-all duration-300 hocus:bg-neutral-300 focus:ring focus:ring-indigo-600/50 active:scale-95" href="/">Anasayfaya Dön</Link>
          {referer && new URL(referer).pathname !== router.pathname && (
            <>
              <span className="text-neutral-600 font-normal text-sm">veya</span>
              <button
                className="px-3 py-2 rounded-lg text-neutral-800 bg-neutral-200 hocus:bg-neutral-300 transition-all duration-300"
                onClick={handleGoBack}
              >
                Geriye Dön
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
