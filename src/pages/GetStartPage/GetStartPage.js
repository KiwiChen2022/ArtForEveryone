import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./GetStartPage.module.css";

function GetStartPage() {
  const navigate = useNavigate();

  const handleGetStartClick = () => {
    navigate("/main");
  };

  return (
    <div>
      <h1 className={style.neonText}>Welcome to Our App!</h1>
      <button className={style.neonButton} onClick={handleGetStartClick}>
        Get Start
      </button>
    </div>
  );
}

export default GetStartPage;
