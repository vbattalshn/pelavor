import Button from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import apiClient from "@/lib/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import WordContent from "@/components/wordContent";

export default function SearchList() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [lang, setLang] = useState("en");
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    if (slug && slug[0]) {
      setSearch(slug[0]);
      getSearchResult(slug[0]);
    }
  }, [slug]);

  useEffect(() => {
    getSearchResult();
  }, [search])

  const formSubmitted = (event) => {
    event.preventDefault();
    getSearchResult();
  };

  const getSearchResult = () => {
    setLoading(true);

    const data = { "word":search, "lang":lang };

    apiClient
      .post("search_word", data)
      .then((response) => {
        setWords(response.data?.data?.results || []);
      })
      .catch((e) => {
        console.error(e);
        setWords([]);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Header />
      <SearchSection search={search} setSearch={setSearch} onSubmit={formSubmitted} lang={lang} setLang={setLang} />
      <div className="max-w-5xl w-full mx-auto flex flex-col bg-neutral-200/50 p-1 gap-1 rounded-lg border border-neutral-200 mb-2 animate-loaded">
        {search.length > 0 && words.length > 0 && !loading ? (
          words.map((word, index) => (
            <WordContent key={index} word={word.word} id={word.id} index={index} lang={lang} />
          ))
        ) : 
          loading == true ? (<p className="p-2 text-center">Yükleniyor..</p>) : search.length > 0 ? (<p className="p-2 text-center">Kelime bulunamadı</p>) : <p className="p-2 text-center">Hemen bir kelime ara. 🔎</p>
        }
      </div>
      <Footer />
    </>
  );
}

const SearchSection = ({ search, setSearch, onSubmit, lang, setLang }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 p-4 mt-4 mb-4 flex flex-col gap-4 bg-neutral-200/50 rounded-2xl items-center justify-center bg-listBgImage bg-center bg-auto">
      <h2 className="text-4xl font-extrabold text-neutral-900">Kelime Ara</h2>
      <p className="text-base font-semibold text-neutral-700">
        Anlamını öğrenmek istediğin kelimeyi pelavor veritabanından doğru şekilde öğren.
      </p>
      <form onSubmit={onSubmit} className="w-full flex gap-2 p-2">
        <Input
          placeholder="Liste Ara"
          className="flex-1 !bg-neutral-100/50 backdrop-blur-sm w-full border-none p-4"
          value={search}
          setValue={setSearch}
        />
        <button className="!bg-neutral-100/50 backdrop-blur-sm rounded-lg border-none p-4" onClick={() => setLang(lang === "en" ? "tr" : "en")} >
          {
            lang == "en" ? "İngilizceden Türkçeye" : "Türkçeden İngilizceye"
          }
        </button>
        <Button type="submit" label="Liste Ara" className="rounded-lg" />
      </form>
    </div>
  );
};
