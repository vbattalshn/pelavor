import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Logout() {
    var router = useRouter();
    useEffect(() => {
        Cookies.remove("session")
        Cookies.remove("status")
        Cookies.remove("user_data")

        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('r')
        router.push(redirect ?? "/");
    }, [])
}