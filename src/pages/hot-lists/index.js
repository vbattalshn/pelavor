import Header from "@/components/header";
import apiClient from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListCard from "@/components/listCard";
import PageHeader from "@/components/page/header";
import PageFilter from "@/components/page/filter";
import Footer from "@/components/footer";
import Head from "next/head";
import ListsLoading from "@/components/listsLoading";

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
      <Head>
        <title>Popüler Listeler | Pelavor</title>
        <meta name="title" content="Popüler Listeler | Pelavor" />
        <meta
          name="description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pelavor.com/hot-lists" />
        <meta property="og:title" content="Pelavor" />
        <meta
          property="og:description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />
        <meta
          property="og:image"
          content="https://files.pelavor.com/pelavor.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pelavor.com/hot-lists" />
        <meta property="twitter:title" content="Pelavor" />
        <meta
          property="twitter:description"
          content="Pelavor ile kelime dağarcığınızı hızla genişletin! Kullanıcılar tarafından oluşturulan zengin kelime listelerine erişin, İngilizce kelimeleri eğlenceli ve etkili bir şekilde öğrenin. Dizi ve film senaryolarından, kitap içeriklerinden ve çalışma materyallerinden derlenen kelimeleri keşfedin. Şimdi kaydolun ve kelime bilginizi geliştirin!"
        />
        <meta
          property="twitter:image"
          content="https://files.pelavor.com/pelavor.png"
        />      </Head>
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
            <div>{loading == true ? <ListsLoading /> : "No lists available"}</div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

