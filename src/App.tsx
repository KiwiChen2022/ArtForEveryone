import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetStartPage from "./pages/GetStartPage/GetStartPage";
import MainPage from "./pages/MainPage";
import Navigation from "./components/Navigation";
import styles from "./App.module.css";
import { type CSSObject, Global } from "@emotion/react";
import BackGround from "./components/BackGround";
import { Theme } from "./ThemeSettings";
import { createTheme } from "./utils/createTheme";
import eventEmitter from "./utils/eventEmitter";
import { ErrorMessage } from "./components/ErrorHandler/ErrorMessage";
import { Message } from "./components/Message";
import { loadBlockchainData } from "./utils/Blockchain";

function App() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [nft, setNFT] = useState<any>(null);

  const loadData = async () => {
    const blockchainData = await loadBlockchainData();

    if (!blockchainData) {
      console.error("Failed to load blockchain data");
      return;
    }
    const { provider, nft } = blockchainData;
    setProvider(provider);
    setNFT(nft);
  };

  useEffect(() => {
    // Load blockchain data

    loadData();

    // Handle API errors
    const handleError = (message: string) => {
      setError(message);
      setTimeout(() => setError(null), 10000); // Clear error message after 10 seconds
    };

    eventEmitter.on("apiError", handleError);

    // Retry loading blockchain data when the network changes
    const handleChainChanged = () => {
      loadData();
    };

    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      eventEmitter.removeListener("apiError", handleError);
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const theme: Theme = createTheme({
    outline: 3,
  });

  return (
    <>
      {error && (
        <ErrorMessage
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
      {message && (
        <Message
          message={message}
          onClose={() => {
            setMessage(null);
          }}
        />
      )}
      <Global
        styles={{
          html: {
            margin: theme.space(2),
            backgroundColor: "none",
          },
          body: {
            fontFamily: theme.font(1).fontFamily,
            color: theme.color.secondary(16),
            backgroundColor: "none",
          },
        }}
      />
      <BackGround />
      <div className={styles.appContainer}>
        <Navigation account={account} setAccount={setAccount} />
        <Router>
          <Routes>
            <Route path="/" element={<GetStartPage nft={nft} />} />
            <Route
              path="/main"
              element={
                <MainPage
                  account={account}
                  message={message}
                  setMessage={setMessage}
                  provider={provider}
                  nft={nft}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
