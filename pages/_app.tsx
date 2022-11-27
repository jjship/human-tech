import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ClickCountContextProvider } from "../src/context/ClickCountContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClickCountContextProvider>
      <Component {...pageProps} />
    </ClickCountContextProvider>
  );
}
