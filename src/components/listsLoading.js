import ListCardLoading from "@/components/listCardLoading";

export default function listsLoading() {
  return (
    <div className="flex items-center w-full gap-4 lg:flex-row flex-col">
      <ListCardLoading />
      <ListCardLoading />
      <ListCardLoading />
    </div>
  );
}
