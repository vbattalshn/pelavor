import BugReporter from '@/components/bugReporter';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';
import apiClient from '@/lib/api';
import { useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => {
        if (response.data?.data?.redirect) {
          toast.success(response.data.message)
          router.push(response.data.data.redirect);
        }
        return response;
      },
      (error) => {
        if (error.response?.data?.data?.redirect) {
          toast.error(error.response.data.message)
          router.push(error.response.data.data.redirect);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  return (
    <>
      <BugReporter />
      <Component {...pageProps} />
      <Toaster position="left-top" />
      <SpeedInsights/>
    </>
  );
}

export default MyApp;
