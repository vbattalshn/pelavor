import Footer from "@/components/footer";
import Header from "@/components/header";
import axios from "axios"; // Import axios for server-side request
import Head from "next/head";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const response = await axios({
      baseURL: "https://api.pelavor.com",
      url: "/get-word-data",
      method: "post",
      headers: {
        Authorization: "Bearer GG839uzFjVhae7cpW6yqzBq7NvOzOfHY",
        "Content-Type": "application/json",
      },
      data: {
        word: slug,
        lang: "en",
      },
    });

    const wordData = response.data?.data?.meanings || [];

    return {
      props: {
        wordData,
        slug,
      },
    };
  } catch (error) {
    console.error("Error fetching word data:", error);
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {
        wordData: [],
        slug, // Pass slug even on error
      },
    };
  }
}

const Word = ({ wordData, slug }) => {

  return (
    <>
      <Head>
        <title>
          { slug[0].toUpperCase() + slug.slice(1) + " Ne Demek? İngilizce-Türkçe Anlamı | Pelavor"}
        </title>
        <meta
          name="title"
          content={ slug[0].toUpperCase() + slug.slice(1) + " Ne Demek? İngilizce-Türkçe Anlamı | Pelavor"}
        />
        <meta name="description" content={slug + " kelimesinin Türkçe anlamı nedir? " + slug + ", İngilizcede nasıl kullanılır? Örnek cümlelerle detaylı açıklama Pelavor'da!"} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={"https://pelavor.com/word/" + slug}
        />
        <meta
          property="og:title"
          content={ slug[0].toUpperCase() + slug.slice(1) + " Ne Demek? İngilizce-Türkçe Anlamı | Pelavor"}
        />
        <meta property="og:description" content={slug + " kelimesinin Türkçe anlamı nedir? " + slug + ", İngilizcede nasıl kullanılır? Örnek cümlelerle detaylı açıklama Pelavor'da!"} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://pelavor.com/word/" + slug}
        />
        <meta
          property="twitter:title"
          content={ slug[0].toUpperCase() + slug.slice(1) + " Ne Demek? İngilizce-Türkçe Anlamı | Pelavor"}
        />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-2 py-4 !pt-10 flex flex-col gap-6">
        <h1 className="font-black text-6xl font-serif capitalize">{slug}</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left table-auto min-w-5xl overflow-hidden">
            <thead>
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Category</th>
                <th className="p-4">English</th>
                <th className="p-4">Turkish</th>
              </tr>
            </thead>
            <tbody>
              {wordData.map((word, index) => (
                <tr key={index} className="text-neutral-800">
                  <td className="p-4 border-b border-blue-gray-50">
                    <p>{index + 1}.</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p>{word.category}</p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p>
                      <span className="capitalize">{slug}</span>{" "}
                      <span className="text-xs">{word.type}</span>
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p>{word.word}</p>
                  </td>
                </tr>
              ))}
              {wordData.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    No definitions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Word;