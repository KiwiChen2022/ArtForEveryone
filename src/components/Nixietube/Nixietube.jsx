import styles from "./Nixietube.module.scss";
import React from "react";


function NixieTube({ number }) {
  const digits = [...Array(10).keys()].map((i) => (
    <span className={`${styles.nixieContainerTubeDigit} ${i === number ? styles.nixieContainerTubeDigitActive : ""}`}>
      {i}
    </span>
  ));
  return <span className={styles.nixieContainerTube}>{digits}</span>;
}

export default function NixieContainer({ number }) {
  const numArr = String(number).padStart(4, "0").split("").map(Number);

  const tubes = numArr.map((num, index) => (
    <NixieTube key={index} number={num} />
  ));
  return <div className={styles.nixieContainer}>{tubes}</div>;
}
