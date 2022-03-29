import "./global.scss";
import { Web3ContextProvider } from "../context/Web3Context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <div>
        {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-');
        `}
      </Script> */}
        <Component {...pageProps} />
        <ToastContainer closeOnClick={false} />
      </div>
    </Web3ContextProvider>
  );
}
