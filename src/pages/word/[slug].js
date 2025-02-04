import Footer from "@/components/footer";
import Header from "@/components/header";
import apiClient from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Word() {
  const router = useRouter();
  const slug = router.query.slug;
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    var data = {
      word: slug,
      lang: "en",
    };

    if(slug != ""){
        apiClient
        .post("/get-word-data", data)
        .then((response) => {
          setWordData(response.data?.data?.meanings || []);
        })
        .catch((e) => {
          toast.error(e.response?.data?.message || "Beklenmeyen bir hata oluştu");
          setWordData([]);
        });
    }
  }, [router, useRouter]);

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-2 py-4 !pt-10 flex flex-col gap-6">
        <h1 className="font-black text-6xl font-serif capitalize">{slug}</h1>
        <table class="w-full text-left table-auto min-w-5xl overflow-auto">
          <thead>
            <tr>
              <th class="p-4"></th>
              <th class="p-4">
                  Category
              </th>
              <th class="p-4">
                  English
              </th>
              <th class="p-4">
                  Turkish
              </th>
            </tr>
          </thead>
          <tbody>
            {wordData.map((word, index) => (
              <tr className="text-neutral-800">
                <td class="p-4 border-b border-blue-gray-50">
                  <p>{(index + 1)}.</p>
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p>{word.category}</p>
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p>
                    <span className="capitalize">{slug}</span> <span className="text-xs">{word.type}</span>
                  </p>
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p>{word.word}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
