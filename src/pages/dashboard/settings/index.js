import Button from "@/components/button";
import Layout from "@/components/dashboardLayout";
import Input from "@/components/input";
import apiClient from "@/lib/api";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PageHead from "@/components/dashboard/pageHead";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isUpdated, setIsUpdated] = useState(true);
  const [isUpdatedData, setIsUpdatedData] = useState(true);
  const [biography, setBiography] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirtday] = useState("");
  const [showGrvtrInfo, setShowGrvtrInfo] = useState(false);
  useEffect(() => {
    setLoading(true);

    apiClient
      .get("/get-user-settings-page-data")
      .then((response) => {
        setEmail(response.data?.data?.email || "");
        setNumber(response.data?.data?.number || "");
        setBiography(response.data?.data?.biography || "");
        setFullname(response.data?.data?.fullname || "");
        setUsername(response.data?.data?.username || "");
        setBirtday(response.data?.data?.birthday || "");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  function UpdateGravatarData() {
    setIsUpdated(false);

    apiClient
      .get("/update-gravatar-data")
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsUpdated(true));
  }

  function UpdatedData() {
    setIsUpdatedData(false);

    var data = {
      email,
      number,
      biography,
      fullname,
      birthday
    };

    apiClient
      .post("/update-user-data", data)
      .then((response) => {
        if (!response.data?.data?.redirect) {
          toast.success(response.data.message);
        }
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsUpdatedData(true));
  }

  return (
    <Layout>
      <PageHead title="Hesap Ayarları" description="Bu sayfada hesabınla ilgili ayarları yapabilirsin. Bütün bilgileri tam ve doğru girmen önemli." />
      <div className="flex flex-col max-w-5xl">
      <div className="settings">
          <SettingsHead
            label="Kullanıcı Adı:"
            info="Kullanıcı adını değiştiremezsin."
          />
          <div className="flex-1 flex items-center">
            <Input
              value={username}
              setValue={() => toast.error("Değiştiremezsin.")}
              type="text"
              className="flex-1"
              disabled
            />
          </div>
        </div>
        <div className="settings">
          <SettingsHead
            label="İsim Soyisim:"
            info="İsim ve Soyismini sadece 90 günde bir değiştirebileceğini unutma."
          />
          <div className="flex-1 flex items-center">
            <Input
              value={fullname}
              setValue={setFullname}
              type="text"
              className="flex-1"
            />
          </div>
        </div>
        <div className="settings">
          <SettingsHead
            label="Gravatar verisini güncelle:"
            info="Profile fotoğrafı ve sosyal medya hesap verilerini gravatardan sağlıyoruz."
          />
          <div className="flex-1 flex items-center gap-4">
            <Button
              onClick={UpdateGravatarData}
              loading={!isUpdated}
              loadingLabel="Güncelleniyor..."
              label="Güncelle"
            />
            <button
              onClick={() => setShowGrvtrInfo(true)}
              className="text-indigo-600 hocus:underline active:scale-95 transition-all"
            >
              Gravatar'a git
            </button>
          </div>
        </div>
        <div className="settings">
          <SettingsHead
            label="Email adresi:"
            info="Değiştirdiğinizde onaylama maili göndereceğiz."
          />
          <div className="flex-1 flex items-center">
            <Input
              value={email}
              setValue={setEmail}
              type="email"
              className="flex-1"
            />
          </div>
        </div>
        <div className="settings">
          <SettingsHead label="Telefon Numarası:" info={null} />
          <div className="flex-1 flex items-center">
            <Input
              value={number}
              setValue={setNumber}
              type="tel"
              className="flex-1"
            />
          </div>
        </div>
        <div className="settings">
          <SettingsHead
            label="Lokasyon:"
            info="Beta sürümünde sadece Türkiye desteklenecektir."
          />
          <div className="flex-1 flex items-center">
            <Input
              value="Türkiye"
              setValue={() => toast.error("Sadece Türkiye destekleniyor.")}
              type="text"
              className="flex-1"
              disabled
            />
          </div>
        </div>
        <div className="settings">
          <SettingsHead
            label="Doğum Tarihi:"
            info="Doğum tarihiniz profilinizde görünmez; yalnızca yasal gereklilikler doğrultusunda saklanır."
          />
          <div className="flex-1 flex items-center">
            <Input
              value={birthday}
              setValue={setBirtday}
              type="date"
              className="flex-1"
            />
          </div>
        </div>
        <div className="settings">
          <SettingsHead
            label="Biyografi:"
            info="Kendinden, işinden ve tecrübelerinden bahset."
          />
          <div className="flex-1 flex items-center">
            <textarea
              className="w-full h-36 bg-neutral-100 px-4 py-3 resize-none border border-neutral-300 rounded-lg text-neutral-900 font-medium text-base"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-end px-2">
          <Button
            onClick={() => UpdatedData("c")}
            loading={!isUpdatedData}
            loadingLabel="Kaydediliyor..."
            label="Kaydet"
            className="rounded-lg"
          />
        </div>
      </div>

      <Dialog
        open={showGrvtrInfo}
        onClose={() => setShowGrvtrInfo(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-neutral-700/50 backdrop-blur-sm">
          <DialogPanel className="max-w-lg space-y-4 border bg-neutral-100 border-neutral-400 rounded-lg p-12">
            <DialogTitle className="font-bold text-neutral-700">
              Gravatar Hakkında
            </DialogTitle>
            <p className="justify text-neutral-600 font-normal">
              Gravatar, sitemizden bağımsız bir platformdur ve Gravatar ile
              paylaştığınız bilgiler web sitemizle doğrudan ilişkili değildir.
              Şu anda beta sürümümüzde, profil görselinizi zenginleştirmek
              amacıyla Gravatar'dan sadece temel bilgilerinizi alıyoruz ve bu
              bilgileri yalnızca kullanıcı profilinizde sergiliyoruz. İlerleyen
              sürümlerde, bu ayarları doğrudan sitemiz üzerinden
              yapabileceksiniz. Gravatar üzerinden elde ettiğimiz bilgiler
              dışında herhangi bir veri paylaşımı yapılmamaktadır ve{" "}
              <span className="font-medium italic">
                bu süreç tamamen güvenlidir
              </span>
              .
            </p>
            <div className="flex gap-4">
              <Link
                href="https://gravatar.com/"
                onClick={() => setShowGrvtrInfo(false)}
                target="_blank"
                className="text-indigo-600 hocus:underline active:scale-95 transition-all flex-1 active:outline-0 active:!ring-0"
              >
                Gravatar'a git
              </Link>
              <button
                className="text-red-600 hocus:underline active:scale-95 transition-all active:outline-0 active:ring-0"
                onClick={() => setShowGrvtrInfo(false)}
              >
                Vazgeç
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Layout>
  );
}

function SettingsHead({ label, info = null }) {
  return (
    <div className="lg:max-w-52 w-full flex flex-col">
      <span className="font-semibold text-neutral-800">{label}</span>
      {info ? (
        <span className="font-normal text-neutral-600 text-sm">{info}</span>
      ) : null}
    </div>
  );
}
