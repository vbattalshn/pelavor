import Logo from "@/assets/logo";
import SigninWithGoogle from "@/components/signinwithgoogle";
import SigninWithGithub from "@/components/signinwithgithub";
import SigninWithEmail from "@/components/signinwithemail";
import Link from "next/link";
import LeftBar from "@/components/LeftBar";
import Head from "next/head";
import CheckAuth from "@/components/checkAuth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const metadata = {
  title: "Pelavor hesabına giriş yap",
  description: "Pelavor hesabına giriş yap",
  keywords: "login, signin, giriş yap",
};

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("session") != undefined) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="flex">
      <Head>
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#f5f5f5"
        />
        <meta name="msapplication-TileColor" content="#202020" />
        <meta name="theme-color" content="#f5f5f5" />
        <title>Pelavora kayıt ol | Pelavor</title>
        <meta
          name="description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />
        <meta
          name="keywords"
          content="English vocabulary learning,Learn English words,Vocabulary builder,Improve English vocabulary,English word lists,English vocabulary exercises,Online vocabulary practice,English learning resources,Study English vocabulary,English words and meanings,English vocabulary quizzes,Effective vocabulary learning,English vocabulary flashcards,English vocabulary for beginners,Advanced English vocabulary"
        />
      </Head>
      <LeftBar
        img="https://images.unsplash.com/photo-1557989048-03456d01a26e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        logoColor="#F5F5F5"
      />
      <div className="flex-1 flex items-center justify-center flex-col gap-4 min-h-screen">
        <div className="flex justify-center items-center flex-col gap-3 ">
          <Title />
          <SigninWithGoogle type="Sign in" />
          <SigninWithGithub type="Sign in" />
          <hr className="w-72 bg-neutral-200 h-[2px] rounded" />
          <SigninWithEmail />
          <div className="text-sm text-neutral-500">
            Don't have an account? 
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="text-neutral-900 font-semibold text-xl w-full flex items-center content-center gap-1">
      <p>Sign in to</p>
      <Logo className="w-auto h-5" color="currentColor" />
    </div>
  );
}
