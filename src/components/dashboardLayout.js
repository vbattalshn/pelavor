import Sidebar from "@/components/dashboard/sidebar";
import CheckAuth from "@/components/checkAuth";
import Head from "next/head";

export default function Dashboard({ children }) {
  return (
    <CheckAuth>
      <Head>
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#e5e5e5" />
        <meta name="msapplication-TileColor" content="#202020" />
        <meta name="theme-color" content="#e5e5e5" />
      </Head>
      <div className="bg-neutral-200 p-2 flex gap-2 overflow-visible lg:flex-row flex-col">
        <Sidebar />
        <main className="flex-1 bg-neutral-100 rounded-lg min-h-dashboardContent ">
          {children}
        </main>
      </div>
    </CheckAuth>
  );
}
