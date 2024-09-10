import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./spinner";
import Cookies from "js-cookie";

export default function CheckAuth({ children, className }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Cookies.get("session") == undefined && Cookies.get("session")) {
      router.push("/login?redirect=" + window.location.href);
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center gap-2 flex-col bg-slate-800/50 backdrop-blur text-neutral-200">
        <Spinner className="w-8 h-8" />
        Kullanıcı Girişi Kontrol ediliyor...
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}
