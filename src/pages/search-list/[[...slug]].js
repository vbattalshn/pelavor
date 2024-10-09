import Button from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Input from "@/components/input";
import PageFilter from "@/components/page/filter";
import apiClient from "@/lib/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ListCard from "@/components/listCard";
import ListsLoading from "@/components/listsLoading";

export default function SearchList(params) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("seo");
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const router = useRouter();
  const slug = router.query.slug;
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (slug && slug[0]) {
      setSearch(slug[0]);
      getSearchResult();
    }
  }, [router, useRouter]);

  const formSubmitted = (event) => {
    event.preventDefault();
    getSearchResult();
  };

  const getSearchResult = () => {
    if (search.length < 3) return; // Minimum 3 karakter kontrolü
    setLoading(true);

    const data = {
      search,
      order,
    };

    apiClient
      .post("search-list", data)
      .then((response) => {
        setLists(response.data?.data || []);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Beklenmeyen bir hata oluştu");
        setLists([]);
      })
      .finally(() => setLoading(false));
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    if (value.length >= 3) {
      setDebounceTimeout(setTimeout(() => getSearchResult(), 300));
    }
  };

  return (
    <>
      <Header />
      <SearchSection search={search} setSearch={handleSearchChange} onSubmit={formSubmitted} />
      <PageFilter setOrder={setOrder} />
      <div className="max-w-5xl w-full mx-auto place-items-center grid grid-cols-auto-fit gap-3 p-2 items-center justify-center">
        {search.length > 0 && lists.length > 0 && !loading ? (
          lists.map((list, index) => (
            <ListCard
              key={index}
              title={list.title}
              description={list.description}
              image={list.image}
              date={list.created_date}
              user={list.user}
              url={list.url}
            />
          ))
        ) : (
          loading ? (<ListsLoading /> ) : search.length > 3 ? (<p>Herhangi bir liste bulunamadı.</p>) : (<p className="p-4">Hemen bir liste ara. 🔎</p>)
        )}
      </div>
      <Footer />
    </>
  );
}

const SearchSection = ({ search, setSearch, onSubmit }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 p-4 mt-4 mb-4 flex flex-col gap-4 bg-neutral-200/50 rounded-2xl items-center justify-center bg-listBgImage bg-center bg-auto">
      <h2 className="text-4xl font-extrabold text-neutral-900">Liste Ara</h2>
      <p className="text-base font-semibold text-neutral-700">
        Kullanıcıların oluşturduğu listeleri ara senin için en iyi olanı bul ve
        kelime dağarcığını geliştir.
      </p>
      <form onSubmit={onSubmit} className="w-full flex gap-2 p-2">
        <Input
          placeholder="Liste Ara"
          className="flex-1 !bg-neutral-100/50 backdrop-blur-sm w-full border-none p-4"
          value={search}
          setValue={setSearch}
        />
        <Button type="Submit" label="Liste Ara" className="rounded-lg" />
      </form>
    </div>
  );
};
 