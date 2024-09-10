import LeftBar from "@/components/LeftBar";
import Input from "@/components/input";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import apiClient from "@/lib/api";
import ErrorMessage from "@/components/errormessage";
import CorrectMessage from "@/components/correctmessage";
import Button from "@/components/button";
import Spinner from "@/components/spinner";
import Exclamation from "@/assets/icons/exclamation";
import Head from "next/head";

export default function ResetPassword() {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("session")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const { slug } = router.query;

    if (!slug || slug.length < 2) {
      router.push("/forgot-password");
      return;
    }

    const requestData = {
      data1: slug[0],
      data2: slug[1],
    };

    apiClient
      .post("/verifyPasswordResetToken", requestData)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(() => {
          router.push("/forgot-password");
        }, 10000);
      });
  }, [router.isReady, router.query]);

  function saveNewPassword() {
    const { slug } = router.query;
    setLoading(true);
    setError(null);
    setCorrect(null);

    const requestData = {
      resetCode,
      newPassword,
      passwordAgain,
      data1: slug[0],
      data2: slug[1],
    };

    apiClient
      .post("/reset-password", requestData)
      .then((response) => {
        setCorrect(response.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }

  if (data) {
    return (
      <main className="flex">
        <Head>
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#f5f5f5"
          />
          <meta name="msapplication-TileColor" content="#202020" />
          <meta name="theme-color" content="#f5f5f5" />
        </Head>

        <LeftBar
          img="https://images.unsplash.com/photo-1557989048-03456d01a26e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          logoColor="#F5F5F5"
        />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 min-h-screen">
          <div className="flex justify-center items-center flex-col gap-3">
            <div className="flex items-center justify-center gap-2 flex-col">
              <Image
                src={data.profile_photo}
                width={144}
                height={144}
                alt="Picture of the author"
                className="w-36 h-36 object-cover rounded-full border-2 border-neutral-200 shadow-lg"
              />
              <span className="font-medium text-neutral-700">
                @{data.username}
              </span>
            </div>
            <ErrorMessage error={error} />
            <CorrectMessage
              message={
                correct
                  ? correct + " - (5 saniye içinde yönlendirileceksiniz)"
                  : null
              }
            />
            <div className="flex flex-col gap-2">
              <label className="flex flex-col gap-1 font-medium">
                Reset Code
                <Input
                  type="number"
                  id="code"
                  value={resetCode}
                  setValue={setResetCode}
                />
              </label>
              <label className="flex flex-col gap-1 font-medium">
                New password
                <Input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  setValue={setNewPassword}
                />
              </label>
              <label className="flex flex-col gap-1 font-medium">
                New password again
                <Input
                  type="password"
                  id="password-again"
                  value={passwordAgain}
                  setValue={setPasswordAgain}
                />
              </label>
              <Button
                onClick={saveNewPassword}
                loading={loading}
                label="Reset Password"
              />
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    if (error) {
      return (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-red-600">
          <Exclamation className="w-12 h-12" />
          <span className="font-semibold">
            {error} - (10 saniye içinde yönlendirileceksiniz)
          </span>
        </div>
      );
    } else {
      return (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-neutral-900">
          <Spinner className="w-12 h-12" />
          <span className="font-semibold">Veri yükleniyor...</span>
        </div>
      );
    }
  }
}
