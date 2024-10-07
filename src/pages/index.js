import BugReporter from "@/components/bugReporter";
import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icons/arrowRight";
import Creator from "@/components/creator";
import Arrow from "@/assets/icons/arrow";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import axios from "axios";
import apiClient from "@/lib/api";
import ListCard from "@/components/listCard";
import Cookies from "js-cookie";

export async function getServerSideProps() {
  try {
    const ListsResponse = await axios({
      baseURL: "https://api.pelavor.com/get-best-lists",
      method: "get",
      headers: {
        Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
        "Content-Type": "application/json",
      },
    });

    const storiesResponse = await axios({
      baseURL: "https://blog.pelavor.com/wp-json/wp/v2/posts?per_page=3",
      method: "get",
      headers: {
        Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
        "Content-Type": "application/json",
      },
    });

    const lists = ListsResponse.data.data;
    const stories = storiesResponse.data;

    return {
      props: {
        lists,
        stories,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);

    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {
        lists: [],
        stories: [],
      },
    };
  }
}

const Home = ({ lists, stories }) => {
  const [isLoginned, setIsLoginned] = useState(false);

  useEffect(() => {
    if (Cookies.get("user_data")) {
      setIsLoginned(true);
    }
  }, []);

  function scrollToElementBottom(className) {
    const element = document.querySelector(`.${className}`);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const bottomPosition = elementRect.top + elementRect.height + scrollY;
      window.scrollTo({
        top: bottomPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`"${className}" adında bir öğe bulunamadı.`);
    }
  }

  return (
    <div>
      <Head>
        <title>Pelavor</title>
        <meta name="title" content="Pelavor" />
        <meta
          name="description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pelavor.com/" />
        <meta property="og:title" content="Pelavor" />
        <meta
          property="og:description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />
        <meta
          property="og:image"
          content="https://files.pelavor.com/pelavor.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pelavor.com/" />
        <meta property="twitter:title" content="Pelavor" />
        <meta
          property="twitter:description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />
        <meta
          property="twitter:image"
          content="https://files.pelavor.com/pelavor.png"
        />
      </Head>
      <Header />
      <div className="w-full flex items-center justify-center bg-mainImage bg-auto bg-center main-section">
        <div className="max-w-5xl mx-auto py-16 px-4 flex items-center justify-center flex-col gap-9">
          <h1 className="font-extrabold text-5xl text-neutral-900 text-center">
            Dil öğrenmen için her yolu keşfet!
          </h1>
          <p className="font-medium text-neutral-700 text-center">
            Diğer kullanıcılar tarafından oluşturulmuş listelerle kelime
            dağarcığını genişlet, her seviyeye uygun hikayelerle dilini
            geliştir. Kullanıcılar tarafından hazırlanmış ve uzmanlar tarafından
            onaylanmış dersleri keşfet. Bloglarla diğer kullanıcıların
            tecrübelerinden faydalan, İngilizce olarak hazırlanmış podcastlerle
            dinleme becerilerini güçlendir.
          </p>
          <button
            onClick={() => scrollToElementBottom("main-section")}
            className="px-4 py-3 rounded-lg bg-indigo-600 text-neutral-200 font-medium"
          >
            Pelavor'u keşfet
          </button>
        </div>
      </div>
      <HotLists lists={lists} />
      <RecentlyPublishedStories stories={stories} />
      {isLoginned ? <RecentlyRegisteredLists /> : null}
      <SSS />
      {/*<BestUsers />*/}
      {/*<ContactSection />*/}
      <Footer />
    </div>
  );
};

function HotLists({ lists }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Popüler listeler"
          desc="Kullanıcılar tarafından en beğenilmiş beğenebileceğini düşündüğümüz listeler."
        />
        <div className="flex gap-4 items-center w-full lg:flex-row flex-col">
          {lists.map((list, index) => (
            <ListCard
              image={list.image}
              title={list.title}
              description={list.description}
              url={list.url}
              user={list.user}
              date={list.created_date}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentlyPublishedStories({ stories }) {
  function cleanHTML(input) {
    let cleanedText = input.replace(/<\/?p>/gi, "");
    cleanedText = cleanedText.replace(/&[^;]+;/g, "");
    return cleanedText;
  }

  return (
    <div className="w-full flex items-center justify-center bg-neutral-200/50 bg-sectionBgImage bg-auto bg-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Son yayınlanan hikayeler"
          desc="Tüm dil seviyelerine ayrı ayrı yazılmış hikayelerden en son yayınlananlar."
        />
        <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
          {stories.map((story, index) => (
            <ListCard
              key={index}
              image={
                story.better_featured_image.media_details.sizes.medium_large
                  .source_url
              }
              title={story.title.rendered}
              description={cleanHTML(story.excerpt.rendered)}
              url={story.link}
              new_tab={true}
              bgColor="bg-neutral-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentlyRegisteredLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var data = {
      count: 3,
    };

    apiClient
      .post("get-registered-lists", data)
      .then((response) => {
        setLists(response.data.data);
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message || "Beklenmeyen bir hata oluştu."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Son Kayıt Olunanan  Listeler"
          desc="Son kayıt olduğun listelerden sadece 3 tanesini burada listelenir diğerlerini görmek için kontrol panelinde n ilgili alana gidin."
        />
        <div className="flex gap-4 items-center w-full lg:flex-row flex-col">
          {lists.length > 0 || loading == false ? (
            lists.map((list, index) => (
              <ListCard
                image={list.image}
                title={list.title}
                description={list.description}
                url={list.url}
                user={list.user}
                date={list.created_date}
                progress={list.progress}
              />
            ))
          ) : (
            <p>{lists.length > 0 ? "Yükleniyor..." : "No lists available"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SSS() {
  const Questions = [
    {
      Question: "Pelavor nedir?",
      Answer:
        "Pelavor, dil öğrenenlerin kelimeleri daha etkili bir şekilde ezberlemelerini sağlayan bir platformdur. Kullanıcılar kendi kelime listelerini oluşturabilir, başkalarının listelerine erişebilir ve kelimeleri doğru bir şekilde yazmayı öğrenebilirler.",
    },
    {
      Question: "Pelavor nasıl çalışır?",
      Answer:
        "Pelavor’da her kullanıcı kelime listeleri oluşturabilir veya mevcut listelere kaydolabilir. Listelerdeki kelimeler, rastgele karşılarına çıkar ve kullanıcılar kelimenin anlamını yazmaya çalışırlar. Bir kelime 3 kez doğru yazıldığında o kelime öğrenilmiş sayılır.",
    },
    {
      Question: "Pelavor’a katılmak ücretli mi?",
      Answer:
        "Pelavor’a katılmak ücretsizdir. Tüm temel özellikleri ücretsiz olarak kullanabilirsiniz, ancak gelecekte ek özellikler ve premium seçenekler sunulabilir.",
    },
    {
      Question: "Pelavor’da başka hangi dilleri öğrenebilirim?",
      Answer:
        "Pelavor şu anda İngilizce odaklıdır, ancak gelecekte farklı dillerin de eklenmesi planlanmaktadır.",
    },
    {
      Question: "Bir kelimeyi doğru yazamadığımda ne olur?",
      Answer:
        "Bir kelimeyi yanlış yazarsanız, kelimenin doğru anlamını görürsünüz ve tekrar öğrenmek için rastgele şekilde karşıınıza çıkmaya devam eder.",
    },
  ];
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Sıkça sorulan sorular"
          desc="Kullanıcılarımız tarafından bize en çok iletilen sorular."
        />
        <div className="max-w-3xl flex flex-col gap-4 py-4 w-full mx-auto">
          {Questions.map((question, index) => (
            <Question
              Question={question.Question}
              Answer={question.Answer}
              key={index}
            />
          ))}
          <div className="flex gap-2 mx-auto text-sm text-neutral-700">
            <span>Aradığın cevabı bulamadın mı?</span>
            <Link
              href="/contact"
              className="underline hocus:text-indigo-600 transition-all"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Question({ Question, Answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col bg-neutral-200/50 w-full rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex justify-between font-bold rounded-lg text-neutral-800 w-full base hocus:bg-neutral-200 ring-inset items-center text-left"
      >
        {Question}
        <Arrow />
      </button>
      {isOpen ? (
        <p className="p-4 pt-0 text-neutral-700 animate-loaded">{Answer}</p>
      ) : null}
    </div>
  );
}

function BestUsers() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="En iyi kullanıcılar"
          desc="En çok Pelavor'a katkıda bulunan takip etmeni tavsiye ettiğimiz çok sevgili kullanıcılarımız."
        />
      </div>
      <div></div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="İletişimde kalalım"
          desc="Yardıma ihtiyacınız olduğunda uzman ekbimizle buradan iletişime geçebilirsiniz."
        />
        <Contact />
      </div>
    </div>
  );
}

function SectionTitle({ title, desc }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-neutral-900 text-4xl">{title}</h2>
      <p className="font-medium text-neutral-700">{desc}</p>
    </div>
  );
}

export default Home;
