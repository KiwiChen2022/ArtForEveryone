import React from 'react';
import styles from './ErrorMessage.module.css';
import { FaTimes } from 'react-icons/fa';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className={styles.errorMessage}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ErrorMessage;
