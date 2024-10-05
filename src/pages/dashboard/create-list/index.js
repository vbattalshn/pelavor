import Header from "@/components/header";
import AddWord from "@/components/addWord";
import AddNewWord from "@/components/addNewWord";
import Layout from "@/components/dashboardLayout";
import ListSettings from "@/components/listSettings";
import Trash from "@/assets/icons/trash";
import Reload from "@/assets/icons/reload";
import { useState } from "react";
import ErrorMessage from "@/components/errormessage";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { forwardRef } from "react";

export default function CreateList() {
  const [listData, setListData] = useState([]);
  const [trash, setTrash] = useState([]);
  const [showTheTrash, setShow] = useState(false);
  const [error, setError] = useState("");
  const [parent] = useAutoAnimate();

  function addWordtoList(word) {
    setError("");
    if (!listData.includes(word)) {
      if (trash.includes(word)) {
        deleteWordinTrash(word);
      }
      setListData(listData.concat(word));
    } else {
      setError("Bu kelime listede zaten var.");
      setTimeout(() => setError(""), 5000);
    }
  }

  function deleteWordinList(word) {
    setListData((prevListData) => prevListData.filter((item) => item !== word));
    setTrash(trash.concat(word));
  }

  function deleteWordinTrash(word) {
    setTrash((prevTrash) => prevTrash.filter((item) => item !== word));
  }

  function reloadWord(word) {
    deleteWordinTrash(word);
    addWordtoList(word);
  }

  return (
    <Layout>
      <main className="max-w-screen-2xl flex gap-2 flex-col lg:flex-row">
        <div className="w-full p-2 flex flex-col gap-2">
          <AddWord addWordtoList={addWordtoList} />
          <AddNewWord addWordtoList={addWordtoList} />
          <ListSettings listData={listData} trashData={trash} />
        </div>
        <div className="w-full p-2 flex flex-col gap-2">
          <div className="bg-neutral-200/50 border border-neutral-200 rounded flex">
            <button
              onClick={() => setShow(false)}
              className={
                "flex-1 rounded rounded-tr-none rounded-br-none font-semibold p-1 transition-all " +
                (!showTheTrash ? "bg-indigo-600 text-neutral-200" : null)
              }
            >
              Liste
            </button>
            <button
              onClick={() => setShow(true)}
              className={
                "flex-1 rounded rounded-tl-none rounded-bl-none font-semibold transition-all " +
                (showTheTrash ? "bg-indigo-600 text-neutral-200" : null)
              }
            >
              Çöp
            </button>
          </div>
          <ErrorMessage error={error} className="w-full" />
          <div className="bg-neutral-200/50 border border-neutral-200 rounded-lg flex flex-col transition gap-2 px-3 py-2 text-neutral-800 font-semibold">
            <span>Eklenen kelime sayısı: {listData.length}</span>
            <span>Çöp kutusundaki kelime sayısı: {trash.length}</span>
          </div>
          {!showTheTrash ? (
            <ListData ref={parent} data={listData} deleteWord={deleteWordinList} />
          ) : (
            <TrashData
              data={trash}
              ref={parent}
              deleteWord={deleteWordinTrash}
              reloadWord={reloadWord}
            />
          )}
        </div>
      </main>
    </Layout>
  );
}

const ListData = forwardRef(({ data, deleteWord }, ref) => {
  return (
    <div ref={ref} className="bg-neutral-200/50 border border-neutral-200 rounded-lg flex flex-col transition">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="border-b border-neutral-300 p-2 last:border-none flex justify-between items-center font-medium"
          >
            {item}
            <button
              onClick={() => deleteWord(item)}
              className="p-1 hocus:bg-red-200 border text-red-700 hocus:ring-red-600/50 hocus:border-red-700 rounded transition-all data-[open]:rotate-180"
            >
              <Trash className="w-6 h-6" />
            </button>
          </div>
        ))
      ) : (
        <div className="border-b border-neutral-300 p-2 last:border-none flex justify-center items-center font-medium">
          Listen boş hemen kelime ekle
        </div>
      )}
    </div>
  );
});

const TrashData = forwardRef(({ data, deleteWord, reloadWord }, ref) => {
  return (
    <div ref={ref} className="bg-neutral-200/50 border border-neutral-200 rounded-lg flex flex-col transition">
      {data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="border-b border-neutral-300 p-2 last:border-none flex justify-between items-center font-medium"
          >
            {item}
            <div className="flex gap-1">
              <button
                onClick={() => reloadWord(item)}
                className="p-1 hocus:bg-neutral-200 border rounded transition-all"
              >
                <Reload className="w-6 h-6" />
              </button>
              <button
                onClick={() => deleteWord(item)}
                className="p-1 hocus:bg-red-200 border text-red-700 hocus:ring-red-600/50 hocus:border-red-700 rounded transition-all"
              >
                <Trash className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="border-b border-neutral-300 p-2 last:border-none flex justify-center items-center font-medium">
          Çöp kutun boş
        </div>
      )}
    </div>
  );
});
