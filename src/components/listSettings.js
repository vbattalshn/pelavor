import Arrow from "@/assets/icons/arrow";
import { useState, useRef, useEffect } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import ErrorMessage from "@/components/errormessage";
import CorrectMessage from "./correctmessage";
import apiClient from "@/lib/api";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useRouter } from "next/router";
import Add from "@/assets/icons/add";
import Image from "next/image";
import ListCard from "./listCard";
import Cookies from "js-cookie";

export default function ListSettings({
  listData,
  trashData,
  isUpdate = false,
  title = "",
  description = "",
  ListImage = null,
  url = null,
}) {
  const [listName, setListName] = useState(title);
  const [listDesc, setListDesc] = useState(description);
  const [image, setImage] = useState(ListImage);
  const [previewUrl, setPreviewUrl] = useState(ListImage);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(Cookies.get("user_data"))
  }, [Cookies])

  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  function saveList() {
    setError("");
    setCorrect("");
    setLoading(true);

    const data = {
      title: listName,
      description: listDesc,
      words: listData,
      trash: trashData,
      password: password,
    };

    apiClient
      .post(isUpdate ? "/update_list" : "/create_list", data)
      .then((response) => {
        if (response.data.data.link) {
          router.push("/list/" + response.data.data.link);
        }
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
    <Disclosure
      defaultOpen
      as="div"
      className="bg-neutral-200/50 border border-neutral-200 p-2 rounded-lg flex flex-col gap-2 transition"
    >
      <div className="text-neutral-800 font-semibold text-lg flex justify-between items-center">
        <span>Liste ayarları</span>
        <DisclosureButton className="p-1 hocus:bg-neutral-300 rounded transition-all data-[open]:rotate-180">
          <Arrow className="w-6 h-6" />
        </DisclosureButton>
      </div>
      <DisclosurePanel className="flex gap-2 flex-col">
        <ErrorMessage error={error} className="w-full" />
        <CorrectMessage message={correct} className="w-full" />
        <label className="flex flex-col gap-1 font-semibold">
          Liste Adı
          <Input
            type="text"
            id="list_name"
            value={listName}
            setValue={setListName}
            className="w-full !bg-neutral-100"
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Liste Açıklama
          <textarea
            className="w-full h-48 bg-neutral-100 px-4 py-3 resize-none border border-neutral-300 rounded-lg text-neutral-900 font-medium text-base"
            value={listDesc}
            onChange={(e) => setListDesc(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Liste Görseli
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-4 w-full rounded-lg border-dashed border-2 border-indigo-600 text-indigo-600 flex items-center justify-center bg-indigo-300/25 hocus:bg-indigo-300/50"
          >
            <Add className="w-10 h-10" />
          </button>
          {previewUrl && (
            <Image
              src={previewUrl}
              height={200}
              width={300}
              className="rounded-lg"
              alt="preview image"
            />
          )}

          <ListCard
              key="1"
              title={listName}
              description={listDesc}
              image={previewUrl ? previewUrl : "/default.png"}
              date="123"
              user={user}
              url="#"
            />
          <input
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            type="file"
            id="listImage"
            name="listImage"
            accept="image/png, image/jpeg"
          />
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Liste Parola
          {isUpdate ? (
            <div className="bg-yellow-400/50 border border-yellow-400 rounded-lg w-full p-2 text-neutral-700 font-medium text-justify">
              Eğer listenizin prolası varsa bu kısımı tekrar doldurun aksi
              taktirde listeniz prolasız hale gelecektir.
            </div>
          ) : null}
          <Input
            type="password"
            id="list_password"
            value={password}
            setValue={setPassword}
            className="w-full !bg-neutral-100"
          />
        </label>
        <Button
          onClick={saveList}
          label={isUpdate ? "Listeyi güncelle" : "Listeyi kaydet"}
          loading={loading}
          className="w-full rounded-lg"
        />
      </DisclosurePanel>
    </Disclosure>
  );
}
