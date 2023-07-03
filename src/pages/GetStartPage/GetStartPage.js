import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./GetStartPage.module.css";
import NixieContainer from "../../components/Nixietube/Nixietube";

function GetStartPage() {
  const navigate = useNavigate();

  const handleGetStartClick = () => {
    navigate("/main");
  };

  return (
    <div>
      <div className={style.imageContainer} />
      <NixieContainer number={1} />
      <button className={style.neonButton} onClick={handleGetStartClick}>
        Get Start
      </button>
    </div>
  );
}

export default GetStartPage;
