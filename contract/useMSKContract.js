import { useContext } from "react";
import config from "../config";
import { Web3Context } from "../context/Web3Context";
import useContract from "../hooks/useContract"
import MSKAbi from "./abi/MSK.json";
import BN from "bignumber.js";

export default function useMSKContract() {
  const { sendTx } = useContext(Web3Context);
  const contract = useContract(MSKAbi, config.contracts.msk);

  return {
    async mintNFT(amount) {
      // const amountInWei = new BN(amount)
      //   .shiftedBy(config.tokens.state.decimals)
      //   .toFixed(0, 1);

      const func = contract.methods.mintNFT(amount);
      await sendTx(func, "Mint");
    },
  };
}
