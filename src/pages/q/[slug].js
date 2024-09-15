import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";
import apiClient from "@/lib/api";
import toast from "react-hot-toast";

export default function QrRedirect(){
    const router = useRouter();
    const [loading, setLoading] =useState(true);

    useEffect(() => {
    if (router.isReady) {
        getUserData();
    }
    }, [router.isReady]);

    function getUserData(){
        var data = {
            "code": router.query.slug
        };

        apiClient
        .post("/get-user-qr-data", data)
        .then((response) => {
            router.push("/user/" + response.data.data.username);
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || "Bir hata oluştu");
            console.error("Error fetching list data:", error);
        })
        .finally();
    }
    return(
        <div className="w-full h-screen flex items-center justify-center flex-col gap-2 text-neutral-600">
            <Spinner className="w-8 h-8" />
            <span className="font-semibold">Yükleniyor...</span>
        </div>
    )
}