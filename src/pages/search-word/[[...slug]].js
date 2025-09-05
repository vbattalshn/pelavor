import Button from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import apiClient from "@/lib/api";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import WordContent from "@/components/wordContent";
import Head from "next/head";
import Link from "next/link";
import AdUnit from "@/components/ads/adunit";

export default function SearchList() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [lang, setLang] = useState("en");
  const router = useRouter();
  const slug = router.query.slug;

  // Memoized search function to prevent unnecessary re-renders
  const getSearchResult = useCallback(async (searchTerm = search) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setWords([]);
      return;
    }

    setLoading(true);
    const data = { word: searchTerm.trim(), lang };

    try {
      const response = await apiClient.post("search_word", data);
      setWords(response.data?.data?.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setWords([]);
      toast.error("Arama sırasında bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [search, lang]);

  // Handle initial URL slug
  useEffect(() => {
    if (slug && slug[0]) {
      const searchTerm = decodeURIComponent(slug[0]);
      setSearch(searchTerm);
      getSearchResult(searchTerm);
    }
  }, [slug]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim().length > 0) {
        getSearchResult();
      } else {
        setWords([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [search, getSearchResult]);

  const formSubmitted = (event) => {
    event.preventDefault();
    if (search.trim().length > 0) {
      getSearchResult();
      // Update URL without navigation
      router.push(`/search-word/${encodeURIComponent(search)}`, undefined, { shallow: true });
    }
  };

  const toggleLanguage = () => {
    setLang(prevLang => prevLang === "en" ? "tr" : "en");
  };

  return (
    <>
      <Head>
        <title>Kelime Ara - Pelavor</title>
        <meta name="description" content="İngilizce kelimeleri ve anlamlarını arayın. Öğrenmek istediğiniz kelimeyi bulun ve anlamını keşfedin." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pelavor.com/search-word" />
        <meta property="og:title" content="Kelime Ara - Pelavor" />
        <meta property="og:description" content="İngilizce kelimeleri ve anlamlarını keşfetmek için arama yapın." />
        <meta property="og:url" content="https://pelavor.com/search-word" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kelime Ara - Pelavor" />
        <meta name="twitter:description" content="İngilizce kelimeleri ve anlamlarını keşfetmek için arama yapın." />
      </Head>
      
      <Header />
      
      <SearchSection 
        search={search} 
        setSearch={setSearch} 
        onSubmit={formSubmitted} 
        lang={lang} 
        onToggleLanguage={toggleLanguage}
      />
      
      <SearchResults 
        search={search}
        words={words}
        loading={loading}
      />
      <div className="mx-auto">
        <AdUnit slot="3261867123" />
      </div>
      
      <Footer />
    </>
  );
}

const SearchSection = ({ search, setSearch, onSubmit, lang, onToggleLanguage }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 p-4 mt-4 mb-4 flex flex-col gap-4 bg-neutral-200/50 rounded-2xl items-center justify-center bg-listBgImage bg-center bg-auto">
      <h2 className="text-4xl font-extrabold text-neutral-900">Kelime Ara</h2>
      <p className="text-base font-semibold text-neutral-700">
        Anlamını öğrenmek istediğin kelimeyi pelavor veritabanından doğru şekilde öğren.
      </p>
      
      <form onSubmit={onSubmit} className="w-full flex sm:flex-row flex-col gap-2 p-2">
        <Input
          placeholder="Kelime ara..."
          className="flex-1 !bg-neutral-100/50 backdrop-blur-sm w-full border-none p-4"
          value={search}
          setValue={setSearch}
        />
        
        <div className="flex flex-1 sm:flex-none gap-2">
          <button 
            type="button"
            className="flex-1 sm:flex-none !bg-neutral-100/50 backdrop-blur-sm rounded-lg border-none p-4 hover:bg-neutral-200/70 transition-colors duration-200" 
            onClick={onToggleLanguage}
          >
            {lang === "en" ? "İngilizceden Türkçeye" : "Türkçeden İngilizceye"}
          </button>
          
          <Button 
            type="submit" 
            label="Ara" 
            className="rounded-lg"
            disabled={!search.trim()}
          />
        </div>
      </form>
    </div>
  );
};

const SearchResults = ({ search, words, loading }) => {
  const getResultsContent = () => {
    if (loading) {
      return (
        <div className="p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-neutral-900"></div>
          <p className="mt-2">Yükleniyor...</p>
        </div>
      );
    }

    if (search.length === 0) {
      return (
        <p className="p-4 text-center text-neutral-600">
          Hemen bir kelime ara. 🔎
        </p>
      );
    }

    if (words.length === 0) {
      return (
        <p className="p-4 text-center text-neutral-600">
          "{search}" için kelime bulunamadı
        </p>
      );
    }

    return words.map((word, index) => (
      <Link 
        key={`${word.word}-${index}`} 
        href={`/word/${encodeURIComponent(word.word)}`} 
        className="block p-3 hover:bg-neutral-200 transition-colors duration-200 rounded-lg border-b border-neutral-200/50 last:border-b-0"
      >
        <span className="font-medium text-neutral-900">{word.word}</span>
        {word.definition && (
          <p className="text-sm text-neutral-600 mt-1 truncate">
            {word.definition}
          </p>
        )}
      </Link>
    ));
  };

  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col bg-neutral-200/50 rounded-lg border border-neutral-200 mb-2 animate-loaded overflow-hidden">
      {getResultsContent()}
    </div>
  );
};