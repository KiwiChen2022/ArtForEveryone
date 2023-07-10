import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

// Components
import ImageForm from "../components/ImageForm";

import { loadBlockchainData } from "../utils/Blockchain";

function MainPage({account, setMessage}) {
  const [provider, setProvider] = useState(null);
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
      <ImageForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        nfturl={nfturl}
        setNfturl={setNfturl}
        provider={provider}
        nft={nft}
        account={account}
        setMessage={setMessage}
      />
    </div>
  );
}

export default MainPage;
