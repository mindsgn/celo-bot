import React, { useEffect } from "react";
import { BrowserWallet } from "@meshsdk/core";

interface wallet {
  address: string | null;
  walletList: any | null;
  wallet: any | null;
  selectedWallet: string | null;
  connectWallet: (name: string) => void;
}

interface WalletContext {
  address: string | null;
  walletList: any | null;
  wallet: any | null;
  selectedWallet: string | null;
  balance: number;
  connectWallet: (icon: string, name: string) => void;
}

export const WalletContext = React.createContext<WalletContext>({
  address: null,
  walletList: null,
  connectWallet: (name: string) => {},
  selectedWallet: null,
  wallet: null,
  balance: 0,
});

export const useMeshWallet = () => React.useContext(WalletContext);

export const WalletProvider = ({ children }: { children: any }) => {
  const [address, setAddress] = React.useState<string | null>(null);
  const [wallet, setWallet] = React.useState<any | null>(null);
  const [selectedWallet, setSelectedWallet] = React.useState<string | null>(
    null
  );
  const [walletList, setWalletList] = React.useState<any[] | null>(null);
  const [networkID, setNetworkID] = React.useState<string | null>(null);
  const [balance, setBalance] = React.useState<number>(0);

  const connectWallet = async (icon: string, name: string) => {
    try {
      const result = await BrowserWallet.enable(name);
      setWallet(result);
      setSelectedWallet(icon);
    } catch (error) {}
  };

  const getWallet = async () => {
    const result = await BrowserWallet.getInstalledWallets();
    setWalletList(result);
  };

  const getWalletDetails = async () => {
    const usedAddresses = await wallet.getUsedAddresses();
    const balance = await wallet.getBalance();
    const { quantity } = balance[0];
    setBalance(parseFloat(quantity) / 1000000);
    setAddress(usedAddresses[0]);

    fetch(`/api/user?address=${usedAddresses[0]}`)
      .then((response) => {
        return response;
      })
      .then(async (response) => {
        const result = await response.json();
        const { data } = result;
        const { address } = data[0];
        setAddress(address);
        console.log(data);
      });
  };

  useEffect(() => {
    if (wallet) {
      getWalletDetails();
    }
  }, [wallet]);

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        walletList,
        selectedWallet,
        connectWallet,
        wallet,
        balance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
