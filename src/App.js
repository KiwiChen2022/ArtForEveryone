import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetStartPage from "./pages/GetStartPage/GetStartPage";
import MainPage from "./pages/MainPage";
import Navigation from "./components/Navigation";
import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className={styles.appContainer}>
      <Navigation account={account} setAccount={setAccount} />
      <Router>
        <Routes>
          <Route path="/" element={<GetStartPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
