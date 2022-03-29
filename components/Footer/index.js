import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <ul>
              <li>Kontext</li>
              <li>• Better content discovery •</li>
            </ul>
          </div>
          <div className={styles.footerRight}>
            <ul>
              <li><a href="https://discord.gg/un6Pma5CSN" target="_blank">Discord</a></li>
              <li><a href="https://twitter.com/kontextcontext" target="_blank">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
