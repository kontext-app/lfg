import React, { useContext, useState } from "react";
import Link from "next/link";
import ClaimModal from "../ClaimModal";
import { Web3Context } from "../../context/Web3Context";
import styles from "./Header.module.scss";

export default function Header() {
  const { account, connectWallet } = useContext(Web3Context);
  const [claimModalVisible, setClaimModalVisible] = useState(false);

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/">
            <img src="/img/logo.jpg" className={styles.logo} />
          </Link>
        </div>
        {/* <div className={styles.headerCenter}>
          <a>Daily</a>
          <a>Weekly</a>
          <a>Monthly</a>
        </div> */}
        <div className={styles.headerRight}>
          <Link href="/about">About</Link>
          <Link href="/tokens">Tokens</Link>
          <a onClick={() => setClaimModalVisible(true)}>Claim NFT</a>
          {account ? (
            <a className={styles.wallet}>
              {account.slice(0, 4)}...{account.slice(-4)}
            </a>
          ) : (
            <a className={styles.wallet} onClick={connectWallet}>
              Connect Wallet
            </a>
          )}
        </div>
      </header>
      {claimModalVisible && <ClaimModal onCancel={()=>setClaimModalVisible(false)} />}
    </div>
  );
}
