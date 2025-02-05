import Layout from "@/components/dashboardLayout";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import ListCard from "@/components/listCard";
import ListsNotFound from "@/components/listsNotFound";
import toast from "react-hot-toast";
import ListsLoading from "@/components/listsLoading";

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    apiClient
      .get("/get_user_lists")
      .then((response) => {
        setLists(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Bir hata oluştu");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="max-w-screen-xl w-full place-items-center grid grid-cols-auto-fit gap-3 p-2 items-center justify-start">
        {loading ? (
          <ListsLoading />
        ) : lists.length === 0 ? (
          <ListsNotFound title="Henüz Oluşturduğun Bir Liste Bulunmuyor" description="Liste oluşturarak takipçi kazan! Belirli bir Pelavor puanına ve takipçi sayısına ulaştığında, listelerini yalnızca abonelerinle paylaşabilir ve ek gelir elde edebilirsin." href="/dashboard/create-list" linkContent="Liste Oluştur" />
        ) : (
          lists.map((list, index) => (
            <ListCard
              key={index}
              title={list.title}
              description={list.description}
              image={list.image}
              date={list.created_date}
              user={list.user}
              url={list.url}
              edit={true}
            />
          ))
        )}
      </div>
    </Layout>
  );
}

