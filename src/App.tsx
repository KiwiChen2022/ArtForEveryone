import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetStartPage from "./pages/GetStartPage/GetStartPage";
import MainPage from "./pages/MainPage";
import Navigation from "./components/Navigation";
import styles from "./App.module.css";
import { type CSSObject, Global } from "@emotion/react";
import BackGround from "./components/BackGround";
import { Theme } from "./ThemeSettings";
import { createTheme } from "./utils/createTheme";

function App() {
  const [account, setAccount] = useState(null);

  // 创建主题
  const theme: Theme = createTheme({
    outline: 3,
  });

  return (
    <>
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
            <Route path="/" element={<GetStartPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
