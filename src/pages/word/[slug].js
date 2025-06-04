import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import Button from "@/components/button";
import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";

const API_CONFIG = {
  baseURL: "https://api.pelavor.com",
  timeout: 5000,
  headers: {
    Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
    "Content-Type": "application/json",
  },
};

// Axios instance
const apiClient = axios.create(API_CONFIG);
// Search Component
const SearchSection = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");
  const router = useRouter();

  const getSearchResult = useCallback(async (searchTerm = search) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      onSearchResults([]);
      return;
    }

    setLoading(true);
    const data = { word: searchTerm.trim(), lang };

    try {
      const response = await apiClient.post("search_word", data);
      const results = response.data?.data?.results || [];
      onSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      onSearchResults([]);
      toast.error("Arama sırasında bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [search, lang, onSearchResults]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim().length > 0) {
        getSearchResult();
      } else {
        onSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, getSearchResult]);

  const formSubmitted = (event) => {
    event.preventDefault();
    if (search.trim().length > 0) {
      getSearchResult();
    }
  };

  const toggleLanguage = () => {
    setLang(prevLang => prevLang === "en" ? "tr" : "en");
  };

  return (
    <div className="bg-neutral-200 rounded-2xl p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Başka Kelime Ara</h2>
        <p className="text-neutral-600">
          Öğrenmek istediğin diğer kelimeleri de keşfet
        </p>
      </div>
      
      <form onSubmit={formSubmitted} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Kelime ara..."
            className="w-full !bg-white/80 backdrop-blur-sm border border-neutral-300 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={search}
            setValue={setSearch}
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            type="button"
            className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-neutral-300 rounded-lg hover:bg-white transition-colors duration-200 text-sm font-medium text-neutral-700" 
            onClick={toggleLanguage}
          >
            {lang === "en" ? "EN→TR" : "TR→EN"}
          </button>
          
          <Button 
            type="submit" 
            label={loading ? "Arıyor..." : "Ara"}
            className="px-6 py-3 rounded-lg min-w-[80px]"
            disabled={!search.trim() || loading}
          />
        </div>
      </form>
    </div>
  );
};

// Search Results Component
const SearchResults = ({ results, search }) => {
  if (!search || search.length === 0) return null;

  if (results.length === 0) {
    return (
      <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-center">
        <div className="text-neutral-500">
          <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium mb-2">Sonuç Bulunamadı</p>
          <p className="text-sm">"{search}" için herhangi bir kelime bulunamadı</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 mb-8 overflow-hidden">
      <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
        <h3 className="font-semibold text-neutral-800">
          Arama Sonuçları ({results.length})
        </h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {results.map((word, index) => (
          <Link 
            key={`${word.word}-${index}`} 
            href={`/word/${encodeURIComponent(word.word)}`} 
            className="block p-4 hover:bg-neutral-50 transition-colors duration-200 border-b border-neutral-100 last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-neutral-900">{word.word}</span>
                {word.definition && (
                  <p className="text-sm text-neutral-600 mt-1 truncate">
                    {word.definition}
                  </p>
                )}
              </div>
              <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const WordTable = ({ wordData, slug }) => {
  if (wordData.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.005-5.824-2.563M15 6.5a7.966 7.966 0 00-6 0m6 0V3a.75.75 0 00-.75-.75h-4.5A.75.75 0 009 3v3.5a7.966 7.966 0 00-6 0" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Anlam Bulunamadı</h3>
          <p className="text-gray-500">Bu kelime için şu anda bir anlam bulunamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto bg-white rounded-lg shadow-sm border border-neutral-200">
      <table className="w-full text-left table-auto">
        <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
          <tr>
            <th className="p-4 font-semibold text-gray-700 text-center">#</th>
            <th className="p-4 font-semibold text-gray-700">Kategori</th>
            <th className="p-4 font-semibold text-gray-700">İngilizce</th>
            <th className="p-4 font-semibold text-gray-700">Türkçe</th>
          </tr>
        </thead>
        <tbody>
          {wordData.map((word, index) => (
            <tr key={index} className="hover:bg-neutral-50 transition-colors duration-150">
              <td className="p-4 border-b border-gray-200 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-neutral-100 text-neutral-800 text-sm font-medium rounded-full">
                  {index + 1}
                </span>
              </td>
              <td className="p-4 border-b border-gray-200">
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  {word.category || 'Genel'}
                </span>
              </td>
              <td className="p-4 border-b border-gray-200">
                <div className="flex flex-col gap-1">
                  <span className="capitalize font-semibold text-gray-900">{slug}</span>
                  {word.type && (
                    <span className="text-xs text-gray-500 italic bg-gray-100 px-2 py-1 rounded w-fit">
                      ({word.type})
                    </span>
                  )}
                </div>
              </td>
              <td className="p-4 border-b border-gray-200">
                <span className="font-medium text-gray-800">{word.word}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ slug }) => (
  <nav className="flex mb-6 text-sm text-gray-500">
    <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
    <span className="mx-2">/</span>
    <Link href="/search-word" className="hover:text-blue-600 transition-colors">Kelime Ara</Link>
    <span className="mx-2">/</span>
    <span className="text-gray-900 capitalize font-medium">{slug}</span>
  </nav>
);

// Structured Data Component
const StructuredData = ({ slug, wordData }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": slug,
    "description": wordData.map(w => w.word).slice(0, 5).join(', '),
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Pelavor İngilizce-Türkçe Sözlük",
      "url": "https://pelavor.com"
    },
    "url": `https://pelavor.com/word/${slug}`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Meta content generator
const generateMetaContent = (slug, wordData) => {
  const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  const meanings = wordData.length > 0 
    ? wordData.map(w => w.word).slice(0, 3).join(', ')
    : 'anlam bulunamadı';
  
  return {
    title: `${capitalizedSlug} Ne Demek? İngilizce-Türkçe Anlamı | Pelavor`,
    description: wordData.length > 0 
      ? `${capitalizedSlug} kelimesinin Türkçe anlamları: ${meanings}. İngilizcede nasıl kullanılır? Örnek cümlelerle detaylı açıklama Pelavor'da!`
      : `${capitalizedSlug} kelimesi için anlam aranıyor. İngilizce-Türkçe sözlük Pelavor'da!`
  };
};

// Error Component
const ErrorState = ({ message }) => (
  <div>
    <Header />
    <div className="py-20 text-center">
      <div className="max-w-md mx-auto">
        <svg className="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Hata Oluştu!</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Slug validation
  if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
    return {
      notFound: true,
    };
  }

  // Normalize slug
  const normalizedSlug = slug.toLowerCase().trim();

  try {
    const response = await apiClient.post("/get-word-data", {
      word: normalizedSlug,
      lang: "en",
    });

    const wordData = response.data?.data?.meanings || [];

    return {
      props: {
        wordData,
        slug: normalizedSlug,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching word data:", error);
    
    // Return empty data instead of redirect for better UX
    return {
      props: {
        wordData: [],
        slug: normalizedSlug,
        error: error.response?.data?.message || "Kelime yüklenirken bir hata oluştu",
      },
    };
  }
}

const Word = ({ wordData, slug, error }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  
  const meta = generateMetaContent(slug, wordData);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  // Error state
  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={`${slug}, İngilizce, Türkçe, anlam, sözlük, çeviri`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://pelavor.com/word/${slug}`} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:site_name" content="Pelavor" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://pelavor.com/word/${slug}`} />
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        
        {/* Additional SEO */}
        <link rel="canonical" href={`https://pelavor.com/word/${slug}`} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="tr" />
        
        {/* Structured Data */}
        <StructuredData slug={slug} wordData={wordData} />
      </Head>
      
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6 !pt-10">
        <Breadcrumb slug={slug} />

        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="text-center lg:text-left">
            <h1 className="font-black text-4xl lg:text-6xl font-serif capitalize text-gray-900 mb-4">
              {slug}
            </h1>
            <p className="text-lg text-gray-600">
              İngilizce "{slug}" kelimesinin Türkçe anlamları ve kullanımları
            </p>
          </div>

          {/* Search Section
          <SearchSection onSearchResults={handleSearchResults} />

           Search Results 
          <SearchResults results={searchResults} search={currentSearch} /> */}

          {/* Word Table */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">
              Anlamlar ve Çeviriler
            </h2>
            <WordTable wordData={wordData} slug={slug} />
          </div>

          {/* Additional Info */}
          {wordData.length > 0 && (
            <div className="bg-neutral-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                💡 Kullanım İpucu
              </h3>
              <p className="text-neutral-700">
                "{slug}" kelimesi {wordData.length} farklı anlamda kullanılabilir. 
                Cümle içindeki bağlama göre doğru anlamı seçmek önemlidir.
              </p>
            </div>
          )}

          {/* Related Words Suggestion */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🔍 Benzer Kelimeler
            </h3>
            <p className="text-blue-800 mb-4">
              "{slug}" kelimesi ile ilgili diğer kelimeleri de keşfedebilirsin.
            </p>
            <Link 
              href="/search-word" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kelime Aramaya Git
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Word;