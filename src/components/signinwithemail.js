import Link from "next/link";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import ErrorMessage from "./errormessage";
import Spinner from "./spinner";
import { useRouter } from 'next/router';
import Button from "./button";
import Cookies from "js-cookie";

export default function SigninWithEmail() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function login() {
    setError("");
    setLoading(true)
    var data = {
      username,
      password,
    };

    
    apiClient
      .post("/signin", data)
      .then((response) => {
        Cookies.set("session", response.data.data.token, { expires: 7 });
        Cookies.set("status", response.data.data.status, { expires: 7 });
        Cookies.set("user_data", JSON.stringify(response.data.data.user_data, { expires: 7 }));

        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect')

        if(redirect){
          router.push(redirect)
        }else{
          router.push("/dashboard")
        }
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
        setError(error.response?.data?.message || "Bir hata oluştu.")
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage error={error} />
      <label className="flex flex-col gap-1 font-semibold">
        Username Or Email
        <Input
          type="text"
          id="username"
          value={username}
          setValue={setUsername}
        />
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        <span className="flex justify-between items-center">
          Password
          <Link
            href="/forgot-password"
            className="text-sm font-normal underline text-neutral-500"
          >
            Forgot?
          </Link>
        </span>
        <Input
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
        />
      </label>
      <Button onClick={login} loading={loading} label="Sign In" />
    </div>
  );
}
