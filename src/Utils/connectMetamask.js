import { ethers } from "ethers";
import { toast } from "react-toastify";

export const connectMetamask = async () => {
  try {
    // Check if Metamask is installed
    if (!window.ethereum) {
      toast.error("No Metamask detected. Please install Metamask to continue.");
      throw new Error("No Metamask detected");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { signer: signer, provider: provider };
  } catch (error) {
    console.error("Error connecting to Metamask:", error);
    throw error;
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  try {
    // Check if Metamask is installed
    if (!window.ethereum) {
      toast.error("No Metamask detected. Please install Metamask to continue.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.error("Error checking wallet connection:", error);
  }
};
