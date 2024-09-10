import Header from "@/components/header";
import PageHeader from "@/components/page/header";
import PageFilter from "@/components/page/filter";
import Input from "@/components/input";

export default function HotLists() {
  return (
    <main>
      <Header />
      <div>
        <PageHeader icon="" title="Arama Sonuçları: " />
        <PageFilter />
      </div>
    </main>
  );
}