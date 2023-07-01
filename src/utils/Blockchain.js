import { ethers } from "ethers";

import NFT from "../abis/NFT.json";
import config from "../config.json";

export const loadBlockchainData = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const network = await provider.getNetwork();
  const nft = new ethers.Contract(
    config[network.chainId].nft.address,
    NFT,
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
