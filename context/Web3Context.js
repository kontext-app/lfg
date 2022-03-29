import react from "react";
import React, { useState, createContext, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import Web3Modal from "web3modal";

export const Web3Context = createContext({
  web3: null,
  account: null,
  connectWallet: async () => {},
  resetWallet: async () => {},
  estimateGas: async () => {},
  sendTx: async () => {},
});

export const Web3ContextProvider = ({ children }) => {
  const [web3, setWeb3] = useState("");
  const [account, setAccount] = useState("");

  const listenProvider = (provider) => {
    provider.on("close", () => {
      resetWallet();
    });
    provider.on("accountsChanged", async (accounts) => {
      setAccount(accounts[0]);
    });
    provider.on("chainChanged", (chainId) => {
      setChainId(parseInt(chainId, 16));
    });
  };

  const connectWallet = useCallback(async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {},
    });

    try {
      const provider = await web3Modal.connect();

      await provider.enable();

      const web3Raw = new Web3(provider);
      setWeb3(web3Raw);

      // get account, use this variable to detech if user is connected
      const accounts = await web3Raw.eth.getAccounts();
      setAccount(accounts[0]);

      listenProvider(provider);
    } catch (err) {
      toast.error("User rejected");
    }
  }, []);

  const resetWallet = useCallback(async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    setAccount("");
  }, []);

  const estimateGas = async (func, value = 0) => {
    try {
      const gas = await func.estimateGas({
        from: account,
        value,
      });
      return Math.floor(gas * 1.2);
    } catch (error) {
      const objStartIndex = error.message.indexOf("{");
      toast.error(error.message.slice(0, objStartIndex));
    }
  };

  const sendTx = async (func, title, value = 0) => {
    const gasLimit = await estimateGas(func);
    if (!isNaN(gasLimit)) {
      return func
        .send({
          gas: gasLimit,
          from: account,
          value,
        })
        .on("transactionHash", (txnHash) => {
          toast.info(title, {
            toastId: txnHash,
            autoClose: false,
          });
        })
        .on("receipt", async (receipt) => {
          const txnHash = receipt?.transactionHash;
          await toast.dismiss(txnHash);
          toast.success(title, {
            // toastId: txnHash,
          });
        })
        .on("error", async (err, txn) => {
          const txnHash = txn?.transactionHash;
          await toast.dismiss(txnHash);

          if (err.code === 4001) {
            toast.error("User canceled action");
          } else {
            toast.error(title, {});
          }
        });
    }
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        connectWallet,
        resetWallet,
        estimateGas,
        sendTx,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const Web3ContextConsumer = Web3Context.Consumer;
