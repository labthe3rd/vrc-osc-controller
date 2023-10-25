import { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  console.log("App page was called so we know it working");
  return (
    <>
      <Component {...pageProps}></Component>
    </>
  );
}
