import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import About from "../components/About";

export default function Home() {
  return (
    <div className="aboutpage">
      <Head>
        <title>Kontext</title>
        <meta name="description" content="Descriptions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <About />
      <Footer />
    </div>
  );
}
