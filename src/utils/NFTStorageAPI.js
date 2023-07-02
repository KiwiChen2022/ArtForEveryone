import axios from "axios";
import { NFTStorage } from "nft.storage";

export const uploadImage = async (imageData, name, description) => {
  // Create instance to NFT.Storage
  const nftstorage = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
  });

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([imageData], { type: "image/png" });

  // Send request to store image
  const { ipnft } = await nftstorage.store({
    image: new File([blob], "image.png"),
    name: name,
    description: description,
  });

  // Save the URL
  const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;

  return url;
};
