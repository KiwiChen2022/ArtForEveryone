import React from 'react';
import styles from './Message.module.css';
import { FaTimes } from 'react-icons/fa';

const Message = ({ message, onClose }) => {
  return (
    <div className={styles.message}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Message;
