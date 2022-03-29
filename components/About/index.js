//import Link from "next/link";
import styles from "./About.module.scss";

export default function About() {
  return (
    <div className="container">
      <div className={styles.textContainer}>
        <p><b>Kontext keeps you up to date on Crypto</b>, by tracking all links shared by our curated set of Crypto Twitter accounts.</p>

        <p>We hope Kontext helps you to learn about Crypto without spending too much time scrolling through Twitter all day — like we used to. 😌</p>

        <p>👉 <a href="https://discord.gg/un6Pma5CSN" target="_blank">Join our Discord</a> and let us know which other communities you would like to see listed next!</p>

        <p>And fixing Twitter is just the start. With Kontext, we aim to curate all your feeds.</p>

        <h2>Kontext = Web3</h2>

        <p><b>Web3 is all about personalization:</b> Instead of Twitter controlling your data and your feed, we let you own your data and use it to personalize your feed.</p>

        <p>Imagine having full access to your curated history of likes, retweets, ratings from Twitter, Netflix, Amazon and Google.
        <b>Combining this data provides a way more accurate representation of your online identity</b> than any of these companies ever will have, by keeping your data isolated in their silos.</p>

        <p><b>By allowing you to fully own your data, Kontext will provide you with personalization superior to any web2 feed.</b> Our first version filters content from Crypto Twitter, to show you the latest news about tokens, DeFi, NFTs, etc.</p>

        <p><b>Superior personalization will define web3</b>, by creating value across all markets which benefit from improved content discovery. Kontext aims to capture this value, and distribute it to stakeholders.</p>

        <p><a href="https://discord.gg/un6Pma5CSN" target="_blank">Join our community</a> and become part of our ecosystem!</p>
      </div>
    </div>
  );
}
