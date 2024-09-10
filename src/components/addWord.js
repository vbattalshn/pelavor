import Arrow from "@/assets/icons/arrow";
import Add from "@/assets/icons/add";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import ErrorMessage from "@/components/errormessage";
import apiClient from "@/lib/api";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

export default function AddWord({addWordtoList}) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function Search() {
    setError("");
    setLoading(true);
    setResults([]);
    var data = {
      word: search,
    };

    apiClient
      .post("/search_word", data)
      .then((response) => {
        console.log(response.data.data.results);
        setResults(response.data.data.results);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setError(error.response.data.message);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <Disclosure as="div" className="bg-neutral-200/50 border border-neutral-200 p-2 rounded-lg flex flex-col gap-2 transition">
      <div className="text-neutral-800 font-semibold text-lg flex justify-between items-center">
        <span>
          Var olan bir{" "}
          <span className="text-indigo-600 underline italic">kelime</span> ekle
        </span>
        <DisclosureButton className="p-1 hocus:bg-neutral-300 rounded transition-all data-[open]:rotate-180">
          <Arrow className="w-6 h-6" />
        </DisclosureButton>
      </div>
      <DisclosurePanel className="flex gap-2 flex-col">
        <SearchWord
            search={search}
            setSearch={setSearch}
            loading={loading}
            error={error}
            Search={Search}
        />
        <Results results={results} addWordtoList={addWordtoList} />
      </DisclosurePanel>
    </Disclosure>
  );
}

function SearchWord({ search, setSearch, loading, error, Search }) {
  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage error={error} className="w-full" />
      <label className="flex flex-col gap-1 font-semibold">
        Kelime Ara
        <Input
          type="text"
          id="username"
          value={search}
          setValue={setSearch}
          className="w-full !bg-neutral-100"
        />
      </label>
      <Button
        onClick={Search}
        loading={loading}
        label="Ara"
        className="w-full rounded-lg"
      />
    </div>
  );
}

function Results({ results, addWordtoList }) {
  return results.length > 0 ? (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-800 font-semibold">Sonuçlar</span>
      <div className="flex flex-col">
        {results.map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b p-1 border-neutral-300 last:border-none text-neutral-600 font-medium"
          >
            <span>{result.word}</span>
            <button className="p-1 hocus:bg-neutral-300 rounded transition-all" onClick={() => addWordtoList(result.word)} >
              <Add className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
