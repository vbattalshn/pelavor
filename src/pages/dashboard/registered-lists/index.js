import Layout from "@/components/dashboardLayout";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import ListCard from "@/components/listCard";
import toast from "react-hot-toast";

export default function RegisteredLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    apiClient
      .get("/get-registered-lists")
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
        {lists.length > 0 || loading==false ? (
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
              progress={list.progress}
            />
          ))
        ) : (
          <p>{lists.length > 0 ? "Yükleniyor..." : "No lists available"}</p>
        )}
      </div>
    </Layout>
  );
}
