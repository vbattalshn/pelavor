import BugReporter from "@/components/bugReporter";
import "../styles/globals.css";
import { Toaster, toast } from "react-hot-toast";
import apiClient from "@/lib/api";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from 'nextjs-toploader';

function MyApp({ Component, pageProps }) {
  apiClient.interceptors.response.use(
    (response) => {
      if (response.data?.data?.redirect) {
        toast.success(response.data.message);
        window.location.href = response.data.data.redirect + "/?r=" + window.location.href;
      }
      return response;
    },
    (error) => {
      if (error.response?.data?.data?.redirect) {
        toast.error(error.response.data.message);
        window.location.href = error.response.data.data.redirect + "/?r=" + window.location.href;
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <NextTopLoader color="#4f46e5" />
      <BugReporter />
      <Component {...pageProps} />
      <Toaster position="left-top" />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default MyApp;
