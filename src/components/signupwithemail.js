import Link from "next/link";
import Input from "@/components/input";
import { useState } from "react";
import apiClient from "@/lib/api";
import ErrorMessage from "./errormessage";
import CorrectMessage from "./correctmessage";
import Button from "./button"

export default function SigninWithEmail() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [correct, setCorrect] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);

  function SignUp() {
      setError('')
      setCorrect('')
      setLoading(true)

      var data = {
        username,
        password,
        email,
        invitationCode
      };

      apiClient
        .post("/signup", data)
        .then((response) => setCorrect(response.data?.message || "Bir hata oluştu."))
        .catch((error) => setError(error.response?.data?.message || "Bir hata oluştu."))
        .finally(() => setLoading(false));
  }
  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage error={error} />
      <CorrectMessage message={correct} />
      <label className="flex flex-col gap-1 font-semibold">
        <span>Kullanıcı Adı</span>
        <Input type="text" id="username" value={username} setValue={setUsername}/>
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        <span>Email</span>
        <Input type="email" id="email" value={email} setValue={setEmail} />
      </label>
      <label className="flex flex-col gap-1 font-semibold">
        <span>Şifre</span>
        <Input type="password" id="password" value={password} setValue={setPassword}/>
      </label>
      {/* <label className="flex flex-col gap-1 font-semibold">
        <span>Davet Kodu</span>
        <Input type="number" id="inavtion" value={invitationCode} setValue={setInvitationCode}/>
      </label> */}
      <Button onClick={SignUp} loading={loading} label="Kayıt Ol" />
      {/* <span className="text-sm text-neutral-500 max-w-96 text-center">
        By creating an account you agree with our{" "}
        <Link href="/" className="underline">
          Terms of Service
        </Link>
        ,{" "}
        <Link href="/" className="underline">
          Privacy Policy
        </Link>
        .
      </span> */}
      <span className="text-sm text-neutral-500 max-w-96 text-center">
        Hesap oluşturarak Hizmet Şartlarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.
      </span>
    </div>
  );
}
