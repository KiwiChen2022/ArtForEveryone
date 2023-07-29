import React from "react";
import styles from "./FaceSwapMessage.module.css";
import { FaTimes } from "react-icons/fa";

const FaceSwapMessage = ({ message, onClose }) => {
  return (
    <div className={styles.message}>
      <p dangerouslySetInnerHTML={{ __html: message }}></p>
      <button
        className={styles.closeButton}
        onClick={onClose}
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          width: "3rem",
          height: "3rem",
        }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default FaceSwapMessage;
