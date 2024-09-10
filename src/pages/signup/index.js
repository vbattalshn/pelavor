import Logo from "@/assets/logo";
import SigninWithGoogle from "@/components/signinwithgoogle";
import SignupWithEmail from "@/components/signupwithemail";
import LeftBar from "@/components/LeftBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Cookies from "js-cookie";

export default function SignUp() {
  const router = useRouter();
  useEffect(() => {

      if(Cookies.get("session") != undefined){
        router.push("/dashboard");
      }
  }, [])

  return (
    <div className="flex">
      <Head>
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
        img="https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        logoColor="#F5F5F5"
      />
      <div className="flex-1 flex items-center justify-center flex-col gap-4 min-h-screen py-4">
        <div className="flex justify-center items-center flex-col gap-3">
          <div className="bg-yellow-400/50 border border-yellow-400 rounded-lg max-w-96 p-2 text-neutral-700 font-medium text-justify">
          Pelavor şu anda beta sürümündedir. Bu nedenle, kayıt işlemlerini sınırlı tutuyoruz. Kayıt olmak için bir davet koduna ihtiyacınız var. Davet kodunuz varsa, kaydınızı tamamlayabilirsiniz.
          </div>
          <Title />
          <SigninWithGoogle type="Sign up" />
          <hr className="w-72 bg-neutral-200 h-[2px] rounded" />
          <SignupWithEmail />
          <span className="text-sm text-neutral-500">
            Do have an account? 
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <h1 className="text-neutral-900 font-semibold text-xl w-full flex items-center content-center gap-1">
      <span>Sign up to</span>
      <Logo className="w-auto h-5" color="currentColor" />
    </h1>
  );
}
