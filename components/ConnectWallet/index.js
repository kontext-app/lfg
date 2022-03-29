import React, { useContext } from "react";
import { Web3Context } from "context/Web3Context";
import "./style.scss";

export default function ConnectWallet() {
  const { account, connectWallet } = useContext(Web3Context);

  return (
    <a className="btn-connect" onClick={connectWallet}>
      Connect Wallet
    </a>
  );
}
