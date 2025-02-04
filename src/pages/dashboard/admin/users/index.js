import Layout from "@/components/dashboardLayout";
import apiClient from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import More from "@/assets/icons/more";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Input from "@/components/input";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [photoViewersIsOpen, setPhotoViewersIsOpen] = useState(false);
  const [banUserIsOpen, setBanUserIsOpen] = useState(false);
  const [sendMsgIsOpen, setSendMsgIsOpen] = useState(false);
  const [photoViewerPhoto, setPhotoViewerPhoto] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    apiClient
    .get("/admin/getAllUsers")
    .then((response) => setUsers(response.data.data.users))
    .catch((error) =>
      console.log(error.response?.data?.message || "Bir hata oluştu.")
    )
    .finally(() => {
      setIsLoading(false);
    });
  }

  const unblockUser = () => {

    var data = {
      username: selectedUser.username,
    };

    apiClient
    .post("/admin/unblock-user", data)
    .then((response) => toast.success(response.data.data.message))
    .catch((error) =>
      toast.error(error.response?.data?.message || "Bir hata oluştu.")
    )
    .finally(() => {
      getUsers();
    });
  }

  function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Ekm",
      "Kas",
      "Ara",
    ];
    return `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}`;
  }

  if (isLoading == false) {
    return (
      <Layout>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm border border-neutral-300 rounded-lg overflow-hidden">
            <thead className="text-xs uppercase bg-neutral-400/50">
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Registration Date</th>
                <th className="px-4 py-2">Ban Status</th>
                <th className="px-4 py-2">Date Of Birth</th>
                <th className="px-4 py-2">Premium Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.username}
                  className={
                    `border border-neutral-300/50 hover:bg-neutral-400/50 transition-all ` +
                    (index % 2 === 0 ? "bg-neutral-200" : "bg-neutral-300")
                  }
                >
                  <th className="px-4 py-2 font-medium">{user.username}</th>
                  <td className="px-4 py-2">{user.fullname}</td>
                  <td className="px-4 py-2">{user.user_email}</td>
                  <td className="px-4 py-2">{user.User_phone_number}</td>
                  <td className="px-4 py-2">
                    {timeConverter(user.Registration_date)}
                  </td>
                  <td className="px-4 py-2">
                    {user.Ban_status === 0 ? (
                      "0"
                    ) : (
                      <span className="text-red-600">
                        {user.Ban_last_date} tarihine kadar banlı
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">{user.Date_of_birth}</td>
                  <td className="px-4 py-2">{user.Premium_status}</td>
                  <td>
                    <ActionsMenu
                      setPhotoViewersIsOpen={setPhotoViewersIsOpen}
                      setPhotoViewerPhoto={setPhotoViewerPhoto}
                      setBanUserIsOpen={setBanUserIsOpen}
                      setSelectedUser={setSelectedUser}
                      unblockUser={unblockUser}
                      user={user}
                      setSendMsgIsOpen={setSendMsgIsOpen}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PhotoViewer
          setPhotoViewersIsOpen={setPhotoViewersIsOpen}
          photoViewersIsOpen={photoViewersIsOpen}
          photoViewerPhoto={photoViewerPhoto}
        />
        <BanUser
          setBanUserIsOpen={setBanUserIsOpen}
          banUserIsOpen={banUserIsOpen}
          selectedUser={selectedUser}
          refresh={getUsers}
        />
        <SendMessage
          setSendMsgIsOpen={setSendMsgIsOpen}
          sendMsgIsOpen={sendMsgIsOpen}
          selectedUser={selectedUser}
        />
      </Layout>
    );
  }
}

function ActionsMenu({
  setPhotoViewersIsOpen,
  setPhotoViewerPhoto,
  user,
  setSelectedUser,
  setBanUserIsOpen,
  unblockUser,
  setSendMsgIsOpen
}) {
  return (
    <Menu>
      <MenuButton className="px-2 py-2 rounded-lg hocus:bg-neutral-200/50 border border-transparent">
        <More />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="flex flex-col bg-neutral-300 border border-neutral-400/50 rounded-lg p-1 shadow-xl"
      >
        <MenuItem>
          <Link
            href={"/user/" + user.username}
            target="_blank"
            className="w-full p-2 text-start hocus:bg-neutral-400/25 rounded"
          >
            Profili Görüntüle
          </Link>
        </MenuItem>
        {user.Ban_status == 0 ? (
          <MenuItem>
            <button
              onClick={() => {
                setSelectedUser(user);
                setBanUserIsOpen(true);
              }}
              className="w-full p-2 text-start hocus:bg-neutral-400/25 rounded"
            >
              Kullanıcıyı Banla
            </button>
          </MenuItem>
        ) : (
          <MenuItem>
            <button
              onClick={() => {
                setSelectedUser(user);
                unblockUser();
              }}
              className="w-full p-2 text-start hocus:bg-neutral-400/25 rounded"
            >
              Banı Kaldır
            </button>
          </MenuItem>
        )}
        <MenuItem>
          <button
            onClick={() => {
              setPhotoViewerPhoto(user.Profile_photo);
              setPhotoViewersIsOpen(true);
            }}
            className="w-full p-2 text-start hocus:bg-neutral-400/25 rounded"
          >
            PP Görüntüle
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => {
              setPhotoViewerPhoto(user.Profile_banner);
              setPhotoViewersIsOpen(true);
            }}
            className="w-full p-2 text-start hocus:bg-neutral-400/25 rounded"
          >
            BP Görüntüle
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => {
              setSelectedUser(user);
              setSendMsgIsOpen(true);
            }}
            className="w-full p-2 text-start hocus:bg-neutral-400/25 rounded"
          >
            Mesaj Gönder
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

function PhotoViewer({
  photoViewerPhoto,
  photoViewersIsOpen,
  setPhotoViewersIsOpen,
}) {
  return (
    <Dialog
      open={photoViewersIsOpen}
      onClose={() => setPhotoViewersIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="max-w-lg flex flex-col gap-2 bg-neutral-300 p-2 rounded-lg shadow-lg">
          <DialogTitle className="font-bold text-lg">
            Fotoğraf Önizleme
          </DialogTitle>
          {photoViewerPhoto ? (
            <img
              src={photoViewerPhoto}
              alt="Görüntü"
              className="max-w-full min-w-96 h-auto rounded-md"
            />
          ) : (
            <p>Görüntü bulunamadı.</p>
          )}
          <button
            onClick={() => setPhotoViewersIsOpen(false)}
            className="px-4 py-2 bg-red-700 text-white rounded-lg"
          >
            Kapat
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function BanUser({ banUserIsOpen, setBanUserIsOpen, selectedUser, refresh }) {
  const [date, setDate] = useState("2100-12-31");
  const [message, setMessage] = useState("");

  const blockUser = () => {
    var data = {
      username: selectedUser.username,
      date: date,
      message: message,
    };

    apiClient
      .post("/admin/block-user", data)
      .then((response) =>
        toast.success(response.data?.message || "Bir hata oluştu.")
      )
      .catch((error) =>
        toast.error(error.response?.data?.message || "Bir hata oluştu.")
      )
      .finally(() => {
        refresh();
        setBanUserIsOpen(false);
      });
  };

  return (
    <Dialog
      open={banUserIsOpen}
      onClose={() => setBanUserIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="max-w-lg flex flex-col gap-2 bg-neutral-200 p-2 rounded-lg shadow-lg">
          <DialogTitle className="font-bold text-lg">
            Kullanıcıyı Banla (
            {selectedUser.username ? selectedUser.username : "null"})
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-1 font-semibold">
              <span>Ban sonlanma tarihi</span>
              <Input
                type="date"
                value={date}
                setValue={setDate}
                className="!bg-neutral-300/50"
              />
            </label>
            <label className="flex flex-col gap-1 font-semibold">
              <span>Banlanma nedeni</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-neutral-300/50 border border-neutral-300 rounded-lg w-96 h-36 p-2 resize-none"
              />
            </label>
            <button
              onClick={blockUser}
              type="submit"
              className="px-4 py-2 bg-red-700 text-white rounded-lg"
            >
              Banla
            </button>
          </div>
          <button
            onClick={() => setBanUserIsOpen(false)}
            className="px-4 py-2 bg-red-700 text-white rounded-lg"
          >
            Kapat
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function SendMessage({ sendMsgIsOpen, setSendMsgIsOpen, selectedUser }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    var data = {
      username: selectedUser.username,
      message: message
    };

    apiClient
      .post("/send-message", data)
      .then((response) =>
        toast.success(response.data?.message || "Bir hata oluştu.")
      )
      .catch((error) =>
        toast.error(error.response?.data?.message || "Bir hata oluştu.")
      )
      .finally(() => {
        setSendMsgIsOpen(false);
      });
  };

  return (
    <Dialog
      open={sendMsgIsOpen}
      onClose={() => setSendMsgIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="max-w-lg flex flex-col gap-2 bg-neutral-200 p-2 rounded-lg shadow-lg">
          <DialogTitle className="font-bold text-lg">
            Mesaj Gönder (
            {selectedUser.username ? selectedUser.username : "null"})
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-1 font-semibold">
              <span>Mesaj</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-neutral-300/50 border border-neutral-300 rounded-lg w-96 h-36 p-2 resize-none"
              />
            </label>
            <button
              onClick={sendMessage}
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Gönder
            </button>
          </div>
          <button
            onClick={() => setBanUserIsOpen(false)}
            className="px-4 py-2 bg-red-700 text-white rounded-lg"
          >
            Kapat
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
