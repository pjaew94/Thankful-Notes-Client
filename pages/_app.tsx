import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from 'react-redux'

import React from "react";
import { store } from './../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Head>
          <title>Thankful Notes</title>
        </Head>
        <Component {...pageProps} />
        </Provider>
    </React.StrictMode>
  );
}

export default MyApp;
