import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import '../styles/Calendar.css'

import React from "react";
import { GlobalProvider } from "../context/Provider";
import { useRouter } from "next/router";
import Nav from "../components/dashboard/Nav.Mobile";


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();


  return ( 
    <React.StrictMode>
      <AnimatePresence exitBeforeEnter>
        <GlobalProvider>
          <Head>
            <title>Thankful Notes</title>
          </Head>
          <Component {...pageProps} key={router.route} />
          <Nav />
        </GlobalProvider>
      </AnimatePresence>
    </React.StrictMode>
  );
}

export default MyApp;
