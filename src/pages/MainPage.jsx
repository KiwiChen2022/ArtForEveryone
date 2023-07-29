import React from "react";
import MainConsole from "../components/MainConsole";

function MainPage({ account, message, setMessage, provider, nft }) {
  return (
    <div>
      <MainConsole
        provider={provider}
        nft={nft}
        account={account}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

export default MainPage;
