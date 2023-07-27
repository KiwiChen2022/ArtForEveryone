import React from "react";
import MainConsole from "../components/MainConsole";

function MainPage({ account, setMessage, provider, nft }) {
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
