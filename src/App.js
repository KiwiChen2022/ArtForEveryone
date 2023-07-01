import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

// Components
import Navigation from "./components/Navigation";
import ImageForm from "./components/ImageForm";
import ChatComponent from "./components/ChatComponent";

// ABIs
import NFT from "./abis/NFT.json";

// Config
import config from "./config.json";
import { loadBlockchainData, mintImage } from "./utils/Blockchain";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nfturl, setNfturl] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { provider, nft } = await loadBlockchainData();
      setProvider(provider);
      setNFT(nft);
    };
    loadData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <ImageForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        nfturl={nfturl}
        setNfturl={setNfturl}
        mintImage={mintImage}
        provider={provider}
        nft={nft}
      />
      <ChatComponent />
    </div>
  );
}

export default App;
