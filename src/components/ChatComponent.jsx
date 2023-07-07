import React, { useState } from "react";
import axios from "axios";
import { sendMessageApi } from "../utils/ChatgptAPI";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cyberPunkStyle = css`
  color: #0ff;
  background: none;
  font-family: "Orbitron", sans-serif;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  .chat-input input {
    border: 2px solid #0ff;
    background-color: transparent;
    color: #0ff;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;

    &:focus {
      outline: none;
    }
  }

  button {
    border: 2px solid #0ff;
    background-color: transparent;
    color: #0ff;
    cursor: pointer;
    transition: background-color 0.5s;
    margin: 0;
    &:hover {
      background-color: #0ff;
      color: #000;
    }
  }
`;


const ChatComponent = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "This is the basic prompt anatomy for image generation with Midjourney: /imagine prompt: PREFIX, SCENE, SUFFIX. PREFIX defines the image's medium and style. SCENE defines the content. SUFFIX modulates PREFIX and SCENE. Please create prompts from my descriptions in the following conversations, one description at a time.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const chatGptMessageContent = await sendMessageApi(newMessages);
    if (chatGptMessageContent !== null) {
      console.log("chatGpt", chatGptMessageContent);
      setMessages((prevMessages) => [...prevMessages, chatGptMessageContent]);
    }
  };

  return (
    <div css={cyberPunkStyle}>
      <div>
        {messages.slice(1).map((message, index) => (
          <div key={index}>
            <b>{message.role}</b>: {message.content}
          </div>
        ))}
      </div>
      <label htmlFor="chat-input"><b>Art Prompt Generator</b></label>
      <input
        className="chat-input"
        id="chat-input"
        type="text"
        value={input}
        placeholder="Unleash your creativity here..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Generator</button>
    </div>
  );
};

export default ChatComponent;
