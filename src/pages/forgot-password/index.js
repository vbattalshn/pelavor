import Logo from "@/assets/logo";
import LeftBar from "@/components/LeftBar";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import ErrorMessage from "@/components/errormessage";
import CorrectMessage from "@/components/correctmessage";
import Button from "@/components/button";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Head from "next/head";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState('');
  const [correct, setCorrect] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {

      if(Cookies.get("session") != undefined){
        router.push("/dashboard");
      }
  }, [])  
  function FindAccount() {
    setLoading(true);
    setError(null)
    setCorrect(null)
    
    var data = {
      username
    };

    apiClient
      .post("/forgot-password", data)
      .then((response) => setCorrect(response.data.message))
      .catch((error) => setError(error.response?.data?.message || "Bir hata oluştu."))
      .finally(() => setLoading(false));
  }

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
        <div className="flex justify-center items-center flex-col gap-3 ">
          <Title />
          <ErrorMessage error={error} />
          <CorrectMessage message={correct} />
          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-1 font-semibold">
              Username Or Email
              <Input type="text" id="username" value={username} setValue={setUsername} />
            </label>
            <Button onClick={FindAccount} loading={loading} label="Find my account"/>
          </div>
        </div>
      </div>
    </main>
  );
}

function Title() {
  return (
    <h1 className="text-neutral-900 font-semibold text-xl w-full flex items-center content-center gap-1">
      <span>Find your</span>
      <Logo className="w-auto h-5" color="currentColor" />
      <span>account</span>
    </h1>
  );
}
