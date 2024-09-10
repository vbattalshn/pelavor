import Layout from "@/components/dashboardLayout";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api";
import ListCard from "@/components/listCard";

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
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="max-w-screen-2xl w-full place-items-center grid grid-cols-auto-fit gap-3 p-2 items-center justify-start">
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
            />
          ))
        ) : (
          <p>{lists.length > 0 ? "Yükleniyor..." : "No lists available"}</p>
        )}
      </div>
    </Layout>
  );
}
