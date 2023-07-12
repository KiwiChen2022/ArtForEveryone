import React, { useState, useEffect } from "react";
import { loadBlockchainData } from "../utils/Blockchain";
import MainConsole from "../components/MainConsole";

function MainPage({account, setMessage}) {
  const [provider, setProvider] = useState(null);
  const [nft, setNFT] = useState(null);

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
      <MainConsole
        provider={provider}
        nft={nft}
        account={account}
        setMessage={setMessage}
      />
    </div>
  );
}

export default MainPage;
