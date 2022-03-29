import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsList from "../components/NewsList";

export default function Home() {
  return (
    <div className="homepage">
      <Head>
        <title>Kontext Crypto News</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Kontext Crypto News Aggregator" />
        <meta name="description" content="Aggregating News From Crypto Twitter" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kontext.app/" />
        <meta property="og:title" content="Kontext Crypto News Aggregator" />
        <meta property="og:description" content="Aggregating News From Crypto Twitter" />
        <meta property="og:image" content="https://i.imgur.com/f3S9ECR.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.kontext.app/" />
        <meta property="twitter:title" content="Kontext Crypto News Aggregator" />
        <meta property="twitter:description" content="Aggregating News From Crypto Twitter" />
        <meta property="twitter:image" content="https://i.imgur.com/f3S9ECR.jpg" />
      </Head>
      <Header />
      <NewsList />
      <Footer />
    </div>
  );
}
