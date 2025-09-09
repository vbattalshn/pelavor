import BugReporter from "@/components/bugReporter";
import Header from "@/components/header";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
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
import toast from "react-hot-toast";
import DOMPurify from 'isomorphic-dompurify'; // HTML sanitization için

// API anahtarını environment variable'dan al
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;

export async function getServerSideProps() {
  try {
    // API anahtarını kontrol et
    if (!API_KEY) {
      console.error("API key bulunamadı");
      return {
        props: {
          lists: [],
          stories: [],
        },
      };
    }

    // Paralel API çağrıları yap
    const [listsResponse, storiesResponse] = await Promise.all([
      axios({
        baseURL: "https://api.pelavor.com/get-best-lists",
        method: "get",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 saniye timeout
      }),
      axios({
        baseURL: "https://blog.pelavor.com/wp-json/wp/v2/posts?per_page=3",
        method: "get",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 saniye timeout
      })
    ]);

    const lists = listsResponse.data?.data || [];
    const stories = storiesResponse.data || [];

    return {
      props: {
        lists,
        stories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    // Hata durumunda boş veri döndür, 404'e yönlendirme
    return {
      props: {
        lists: [],
        stories: [],
        error: "Veriler yüklenirken bir hata oluştu",
      },
    };
  }
}

const Home = ({ lists = [], stories = [], error }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cookie kontrolünü optimize et
  useEffect(() => {
    try {
      const userData = Cookies.get("user_data");
      setIsLoggedIn(!!userData);
    } catch (error) {
      console.error("Cookie okuma hatası:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Smooth scroll fonksiyonunu optimize et
  const scrollToElementBottom = useCallback((className) => {
    try {
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
        console.warn(`"${className}" adında bir element bulunamadı.`);
      }
    } catch (error) {
      console.error("Scroll hatası:", error);
    }
  }, []);

  // Meta verilerini memo ile optimize et
  const metaData = useMemo(() => ({
    title: "Pelavor - Dil Öğrenme Platformu",
    description: "Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin.",
    url: "https://pelavor.com/",
    image: "https://files.pelavor.com/pelavor.png"
  }), []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{metaData.title}</title>
        <meta name="title" content={metaData.title} />
        <meta name="description" content={metaData.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaData.url} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaData.url} />
        <meta property="twitter:title" content={metaData.title} />
        <meta property="twitter:description" content={metaData.description} />
        <meta property="twitter:image" content={metaData.image} />
      </Head>
      
      <Header />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <main className="w-full flex items-center justify-center bg-mainImage bg-auto bg-center main-section">
        <div className="max-w-5xl mx-auto py-16 px-4 flex items-center justify-center flex-col gap-9">
          <h1 className="font-black text-6xl text-neutral-900 text-center tracking-wide [text-shadow:_0_0_5px_rgb(0_0_0_/_50%)] max-md:text-4xl">
            Dil öğrenmen için her yolu keşfet!
          </h1>
          <p className="font-medium text-neutral-700 text-center max-w-4xl">
            Diğer kullanıcılar tarafından oluşturulmuş listelerle kelime
            dağarcığını genişlet, her seviyeye uygun hikayelerle dilini
            geliştir. Kullanıcılar tarafından hazırlanmış ve uzmanlar tarafından
            onaylanmış dersleri keşfet. Bloglarla diğer kullanıcıların
            tecrübelerinden faydalan, İngilizce olarak hazırlanmış podcastlerle
            dinleme becerilerini güçlendir.
          </p>
          <button
            onClick={() => scrollToElementBottom("main-section")}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium drop-shadow-lg transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Pelavor'u keşfetmek için sayfayı aşağı kaydır"
          >
            Pelavor'u keşfet
          </button>
        </div>
      </main>

      <HotLists lists={lists} />
      <RecentlyPublishedStories stories={stories} />
      {isLoggedIn && <RecentlyRegisteredLists />}
      <FAQ />
      <Footer />
    </div>
  );
};

// Memoized component for better performance
const HotLists = ({ lists }) => {
  if (!lists || lists.length === 0) {
    return (
      <section className="w-full flex items-center justify-center">
        <div className="max-w-5xl w-full mx-auto py-8 px-4">
          <SectionTitle
            title="Popüler listeler"
            desc="Şu anda popüler liste bulunmamaktadır."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-center">
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
              key={`hot-list-${list.id || index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentlyPublishedStories = ({ stories }) => {
  // Güvenli HTML temizleme fonksiyonu
  const cleanHTML = useCallback((input) => {
    if (!input || typeof input !== 'string') return '';
    
    try {
      // HTML taglerini temizle
      let cleanedText = input.replace(/<\/?[^>]+(>|$)/g, '');
      
      // HTML entities decode
      const htmlEntities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&nbsp;': ' ',
        '&hellip;': '...',
        '&ndash;': '–',
        '&mdash;': '—'
      };
      
      cleanedText = cleanedText.replace(/&[^;]+;/g, (entity) => {
        return htmlEntities[entity] || '';
      });
      
      // Extra whitespace'leri temizle
      cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
      
      return cleanedText.substring(0, 150) + (cleanedText.length > 150 ? '...' : '');
    } catch (error) {
      console.error('HTML temizleme hatası:', error);
      // Fallback: basit regex temizleme
      return input.replace(/<[^>]*>/g, '').substring(0, 150);
    }
  }, []);

  if (!stories || stories.length === 0) {
    return (
      <section className="w-full flex items-center justify-center bg-neutral-200/50 bg-sectionBgImage bg-auto bg-center">
        <div className="max-w-5xl w-full mx-auto py-8 px-4">
          <SectionTitle
            title="Son yayınlanan hikayeler"
            desc="Şu anda yayınlanmış hikaye bulunmamaktadır."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-center bg-neutral-200/50 bg-sectionBgImage bg-auto bg-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Son yayınlanan hikayeler"
          desc="Tüm dil seviyelerine ayrı ayrı yazılmış hikayelerden en son yayınlananlar."
        />
        <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
          {stories.map((story, index) => (
            <ListCard
              key={`story-${story.id || index}`}
              image={
                story.better_featured_image?.media_details?.sizes?.medium_large?.source_url ||
                '/default-story-image.jpg'
              }
              title={story.title?.rendered || 'Başlık bulunamadı'}
              description={cleanHTML(story.excerpt?.rendered)}
              url={story.link}
              newTab={true}
              bgColor="bg-neutral-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentlyRegisteredLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLists = async () => {
      try {
        setError(null);
        
        const response = await apiClient.post("get-registered-lists", {
          count: 3,
        });
        
        if (isMounted) {
          setLists(response.data?.data || []);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Beklenmeyen bir hata oluştu.";
        
        if (isMounted) {
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLists();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center">
        <div className="max-w-5xl w-full mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-64 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex items-center justify-center">
        <div className="max-w-5xl w-full mx-auto py-8 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Son Kayıt Olunan Listeler"
          desc="Son kayıt olduğun listelerden sadece 3 tanesini burada listelenir. Diğerlerini görmek için kontrol panelindeki ilgili alana gidin."
        />
        <div className="flex gap-4 items-center w-full lg:flex-row flex-col">
          {lists.length > 0 ? (
            lists.map((list, index) => (
              <ListCard
                image={list.image}
                title={list.title}
                description={list.description}
                url={list.url}
                user={list.user}
                date={list.created_date}
                progress={list.progress}
                key={`registered-list-${list.id || index}`}
              />
            ))
          ) : (
            <p className="text-gray-500">Kayıt olduğunuz liste bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const questions = useMemo(() => [
    {
      id: 'pelavor-nedir',
      question: "Pelavor nedir?",
      answer: "Pelavor, dil öğrenenlerin kelimeleri daha etkili bir şekilde ezberlemelerini sağlayan bir platformdur. Kullanıcılar kendi kelime listelerini oluşturabilir, başkalarının listelerine erişebilir ve kelimeleri doğru bir şekilde yazmayı öğrenebilirler.",
    },
    {
      id: 'pelavor-nasil-calisir',
      question: "Pelavor nasıl çalışır?",
      answer: "Pelavor'da her kullanıcı kelime listeleri oluşturabilir veya mevcut listelere kaydolabilir. Listelerdeki kelimeler, rastgele karşılarına çıkar ve kullanıcılar kelimenin anlamını yazmaya çalışırlar. Bir kelime 3 kez doğru yazıldığında o kelime öğrenilmiş sayılır.",
    },
    {
      id: 'ucretsiz-mi',
      question: "Pelavor'a katılmak ücretli mi?",
      answer: "Pelavor'a katılmak ücretsizdir. Tüm temel özellikleri ücretsiz olarak kullanabilirsiniz, ancak gelecekte ek özellikler ve premium seçenekler sunulabilir.",
    },
    {
      id: 'diller',
      question: "Pelavor'da başka hangi dilleri öğrenebilirim?",
      answer: "Pelavor şu anda İngilizce odaklıdır, ancak gelecekte farklı dillerin de eklenmesi planlanmaktadır.",
    },
    {
      id: 'yanlis-yazma',
      question: "Bir kelimeyi doğru yazamadığımda ne olur?",
      answer: "Bir kelimeyi yanlış yazarsanız, kelimenin doğru anlamını görürsünüz ve tekrar öğrenmek için rastgele şekilde karşıınıza çıkmaya devam eder.",
    },
  ], []);

  return (
    <section className="w-full flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto py-8 px-4 flex items-start justify-center flex-col gap-8">
        <SectionTitle
          title="Sıkça sorulan sorular"
          desc="Kullanıcılarımız tarafından bize en çok iletilen sorular."
        />
        <div className="max-w-3xl flex flex-col gap-4 py-4 w-full mx-auto">
          {questions.map((item) => (
            <QuestionItem
              question={item.question}
              answer={item.answer}
              key={item.id}
            />
          ))}
          <div className="flex gap-2 mx-auto text-sm text-neutral-700">
            <span>Aradığın cevabı bulamadın mı?</span>
            <Link
              href="/contact"
              className="underline hover:text-indigo-600 focus:text-indigo-600 transition-colors duration-200"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuestionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="flex flex-col bg-neutral-200/50 w-full rounded-lg overflow-hidden">
      <button
        onClick={toggleOpen}
        className="p-4 flex justify-between font-bold rounded-lg text-neutral-800 w-full hover:bg-neutral-200 focus:bg-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ring-inset items-center text-left transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`answer-${question}`}
      >
        {question}
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <Arrow />
        </span>
      </button>
      {isOpen && (
        <div 
          id={`answer-${question}`}
          className="p-4 pt-0 text-neutral-700 animate-slide-down"
        >
          {answer}
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ title, desc }) => (
  <div className="flex flex-col gap-2">
    <h2 className="font-extrabold text-neutral-900 text-4xl max-md:text-3xl">{title}</h2>
    <p className="font-medium text-neutral-700 max-w-3xl">{desc}</p>
  </div>
);

export default Home;