import Header from "@/components/header";
import apiClient from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListCard from "@/components/listCard";
import PageHeader from "@/components/page/header";
import PageFilter from "@/components/page/filter";
import Footer from "@/components/footer";
import ListCardLoading from "@/components/listCardLoading";

export default function HotLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("Seo");

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    getLists();
  }, [order]);

  function getLists() {
    var data = { order };

    setLoading(true);

    apiClient
      .post("/get-lists", data)
      .then((response) => {
        setLists(response.data?.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Bir Hata Oluştu.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <main>
      <Header />
      <div>
        <PageHeader icon="🔥" title="Popüler Listeler" />
        <div className="max-w-5xl w-full mx-auto place-items-center grid grid-cols-auto-fit gap-3 p-2 items-center justify-center">
          {lists.length > 0 && loading == false ? (
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
            <div>{loading == true ? <HotListsLoading /> : "No lists available"}</div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

function HotListsLoading(params) {
  return (
    <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
      <ListCardLoading />
      <ListCardLoading />
      <ListCardLoading />
    </div>
  );
}
