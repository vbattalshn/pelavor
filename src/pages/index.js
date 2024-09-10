import BugReporter from "@/components/bugReporter";
import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("session") == undefined) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Pelavor</title>
        <meta name="description" content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!" />
        <meta name="keywords" content="English vocabulary learning,Learn English words,Vocabulary builder,Improve English vocabulary,English word lists,English vocabulary exercises,Online vocabulary practice,English learning resources,Study English vocabulary,English words and meanings,English vocabulary quizzes,Effective vocabulary learning,English vocabulary flashcards,English vocabulary for beginners,Advanced English vocabulary" />
      </Head>
      <Header />
    </div>
  );
}
