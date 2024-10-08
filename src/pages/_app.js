import BugReporter from "@/components/bugReporter";
import "../styles/globals.css";
import { Toaster, toast } from "react-hot-toast";
import apiClient from "@/lib/api";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from 'nextjs-toploader';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react/cjs/react.production.min";
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

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCc8lh1cg1pE6mgvCRPGpJKuVpAO9CMIkg",
      authDomain: "pelavor-3272c.firebaseapp.com",
      projectId: "pelavor-3272c",
      storageBucket: "pelavor-3272c.appspot.com",
      messagingSenderId: "144599565473",
      appId: "1:144599565473:web:479544f1e3a0350b859ce0",
      measurementId: "G-TQRV0HX4BF"
    };
    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);    
  })
  

  return (
    <>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-1113432847008327" />
      </Head>
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
