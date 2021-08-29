import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { initializeAnalytics } from "../vendors/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  // If you don't call this inside a useEffect, it will run on the server side and fail
  useEffect(initializeAnalytics, []);
  return <Component {...pageProps} />;
}
export default MyApp;