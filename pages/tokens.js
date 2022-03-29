import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tokens from "../components/Tokens";

export default function Home() {
  return (
    <div className="aboutpage">
      <Head>
        <title>Kontext</title>
        <meta name="description" content="Descriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Tokens />
      <Footer />
    </div>
  );
}
