import { useState } from "react";
import Input from "../input";
import Button from "../button";
import apiClient from "@/lib/api";
import toast from "react-hot-toast";

export default function AddComment({ url, refresh, setRefresh }) {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);

  function SendComment() {
    setLoading(true);

    console.log(url);

    var data = {
      url: url,
      comment,
    };

    apiClient
      .post("add-comment", data)
      .then((response) => {
        setComment(null);
        toast.success(response.data?.message || "Yorum eklendi.");
        setRefresh(refresh + 1);
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Bir hata oluştu.")
      )
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex gap-2 p-2 bg-neutral-200/50 rounded-lg">
      <Input
        className="flex-1 focus:bg-neutral-100"
        placeholder="Add a commnet"
        value={comment}
        setValue={setComment}
      />
      <Button
        loading={loading}
        label="Gönder"
        onClick={SendComment}
        loadingLabel="Gönderiliyor..."
        className="rounded-lg"
      />
    </div>
  );
}
