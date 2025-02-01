import { Html, Head, Main, NextScript } from "next/document";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function Document() {
  const [parent] = useAutoAnimate();
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#ebedf0" />
        <meta name="msapplication-TileColor" content="#202020" />
        <meta name="theme-color" content="#ebedf0" />
        <meta name="robots" content="index, follow" />
        <meta name="contentType" content="text/html; charset=utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

              <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#202020" />
          <link rel="icon" href="/favicon/favicon-32x32.png" />

      </Head>
      <body ref={parent}>
        <Main />
        <NextScript />
        </body>
    </Html>
  );
}
