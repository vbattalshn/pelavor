import BugReporter from "@/components/bugReporter";
import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ArrowRight from "@/assets/icons/arrowRight";
import Creator from "@/components/creator";
import apiClient from "@/lib/api";
import toast from "react-hot-toast";
import Arrow from "@/assets/icons/arrow";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ListCardLoading from "@/components/listCardLoading";

export default function Home() {
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
      <meta name="description" content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pelavor.com/" />
      <meta property="og:title" content="Pelavor" />
      <meta property="og:description" content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!" />
      <meta property="og:image" content="https://files.pelavor.com/pelavor.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://pelavor.com/" />
      <meta property="twitter:title" content="Pelavor" />
      <meta property="twitter:description" content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!" />
      <meta property="twitter:image" content="https://files.pelavor.com/pelavor.png" />
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
      <HotLists />
      <RecentlyPublishedStories />
      <SSS />
      {/*<BestUsers />*/}
      {/*<ContactSection />*/}
      <Footer />
    </div>
  );
}

function HotLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("get-best-lists")
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
          title="Popüler listeler"
          desc="Kullanıcılar tarafından en beğenilmiş beğenebileceğini düşündüğümüz listeler."
        />
        <div className="flex gap-4 items-center w-full lg:flex-row flex-col">
          {lists.length > 0 && loading == false ? (
            lists.map((list, index) => (
              <NewListCard
                image={list.image}
                title={list.title}
                description={list.description}
                url={list.url}
                user={list.user}
                date={list.created_date}
              />
            ))
          ) : (
            <>
              {loading == true ? (
                <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
                  <ListCardLoading />
                  <ListCardLoading />
                  <ListCardLoading />
                </div>
              ) : (
                "No lists available"
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RecentlyPublishedStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  function cleanHTML(input) {
    let cleanedText = input.replace(/<\/?p>/gi, "");
    cleanedText = cleanedText.replace(/&[^;]+;/g, "");
    return cleanedText;
  }

  useEffect(() => {
    apiClient
      .get("https://blog.pelavor.com/wp-json/wp/v2/posts?per_page=3")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message || "Beklenmeyen bir hata oluştu."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex items-center justify-center bg-neutral-200/50 bg-sectionBgImage bg-auto bg-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Son yayınlanan hikayeler"
          desc="Tüm dil seviyelerine ayrı ayrı yazılmış hikayelerden en son yayınlananlar."
        />
        <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
          {stories.length > 0 && loading == false ? (
            stories.map((story, index) => (
              <NewListCard
                index={index}
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
            ))
          ) : (
            <>
              {loading == true ? (
                <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
                  <ListCardLoading />
                  <ListCardLoading />
                  <ListCardLoading />
                </div>
              ) : (
                "No lists available"
              )}
            </>
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

function NewListCard({
  image,
  title,
  description,
  url,
  new_tab = false,
  user = null,
  date = null,
  bgColor = "bg-neutral-200/50",
}) {
  return (
    <div
      className={
        "max-w-80 h-96 flex rounded-lg overflow-hidden items-center justify-between flex-col " +
        bgColor
      }
    >
      <Image
        src={image}
        width={320}
        height={180}
        className="w-80 h-[180px] cover object-cover"
      />
      <div className="flex w-full px-4 py-3 gap-2 flex-col">
        {user != null ? (
          <div className="flex gap-4 text-neutral-700">
            <Creator
              username={user.username}
              profile={user.Profile_photo}
              verification={user.User_verification_status}
            />
            {date}
          </div>
        ) : null}

        <h3 className="font-bold text-neutral-800 line-clamp-1" title={title}>
          {title}
        </h3>
        <p className="line-clamp-3	text-neutral-700" title={description}>
          {description}
        </p>
      </div>
      {new_tab == false ? (
        <Link
          href={"/list/" + url}
          className="flex gap-2 px-4 py-2 w-full justify-end text-indigo-600 hocus:gap-4 transition-all"
        >
          İncele
          <ArrowRight />
        </Link>
      ) : (
        <a
          href={url}
          className="flex gap-2 px-4 py-2 w-full justify-end text-indigo-600 hocus:gap-4 transition-all"
          target="_blank"
        >
          Oku
          <ArrowRight />
        </a>
      )}
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
