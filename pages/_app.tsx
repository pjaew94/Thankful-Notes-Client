import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import React from "react";
import { GlobalProvider } from "../context/Provider";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <React.StrictMode>
        <GlobalProvider>
      <AnimatePresence exitBeforeEnter>
          <Head>
            <title>Thankful Notes</title>
          </Head>
          <Component {...pageProps} key={router.route} />
      </AnimatePresence>
        </GlobalProvider>
    </React.StrictMode>
  );
}

export default MyApp;
