import { useState, useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import useMSKContract from "../../contract/useMSKContract";
import styles from "./styles.module.scss";

import Modal from "../Modal";

export default function ClaimModal({ onCancel }) {
  const { account } = useContext(Web3Context);
  const [amount, setAmount] = useState("1");
  const MSKContract = useMSKContract();
  const doClaim = async () => {
    if (!account) {
      toast.error("Please connect wallet");
      return;
    }
    await MSKContract.mintNFT(amount);
  };
  return (
    <Modal onCancel={onCancel}>
      <div className={styles.title}>How many NFT to claim?</div>
      <input
        className={styles.input}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className={styles.btn} onClick={doClaim}>
        Claim
      </button>
    </Modal>
  );
}
