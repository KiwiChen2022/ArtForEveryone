import { ethers } from "ethers";

import NFT from "../abis/NFT.json";
import config from "../config.json";

import eventEmitter from "./eventEmitter";

const expectedChainId = 137;
const expectedNetwork = "Polygon";

//check if the user has MetaMask installed
const checkMetaMaskInstalled = () => {
  if (!window.ethereum) {
    eventEmitter.emit(
      "apiError",
      "Please install MetaMask to use this application."
    );
    return false;
  }
  return true;
};

//check if the user is connected to the right network
const checkNetwork = async (provider) => {
  const network = await provider.getNetwork();
  if (network.chainId !== expectedChainId) {
    eventEmitter.emit(
      "apiError",
      `Please switch network to ${expectedNetwork}`
    );
    return false;
  }
  return true;
};

export const loadBlockchainData = async () => {
  if (!checkMetaMaskInstalled()) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const network = await provider.getNetwork();

  if (!(await checkNetwork(provider))) return;

  const nft = new ethers.Contract(
    config[network.chainId].nft.address,
    NFT.abi,
    provider
  );

  return { provider, nft };
};

export const mintImage = async (provider, nft, metadataUrl) => {
  const signer = provider.getSigner();
  const tx = await nft
    .connect(signer)
    .mint(metadataUrl, { value: ethers.utils.parseEther("1") });

  const receipt = await tx.wait();
  console.log("Minted image:", receipt);
};

export const getTotalSupply = async (nft) => {
  const totalSupply = await nft.totalSupply();
  console.log("Total minted NFTs:", totalSupply.toString());
};
