import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetStartPage from "./pages/GetStartPage/GetStartPage";
import MainPage from "./pages/MainPage";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <>
      <Navigation account={account} setAccount={setAccount} />
      <Router>
        <Routes>
          <Route path="/" element={<GetStartPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
