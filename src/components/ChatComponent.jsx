import React, { useState } from "react";
import axios from "axios";
import { sendMessageApi } from "../utils/ChatgptAPI";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChatMessage from "./ChatMessage";

const cyberPunkStyle = css`
  color: #0ff;
  background: none;
  font-family: "Orbitron", sans-serif;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  width: 100%;

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const temporaryMessages = [
      {
        role: "system",
        content:
          "Midjourney is an AI model used to generate images from text. ChatGPT will now enter 'Midjourney Prompt Generator Mode' and restrict ChatGPT's outputs to Midjourney prompts, please follow these instructions carefully. This is the basic prompt anatomy for image generation with Midjourney: the image's medium and style, the content, art styles and artist styles. Adding a double colon :: to a prompt indicates to the Midjourney Bot that it should consider each part of the prompt separately. For the prompt `space ship`, all words are considered together, and the Midjourney Bot produces images of sci-fi spaceships. If the prompt is separated into two parts, `space:: ship`, both concepts are considered separately, creating a sailing ship traveling through space. Marking some art styles and artist styles with :: is also helpful for producing high quality prompts. Here are some good prompt examples: 1. a Shakespeare stage play, yellow mist, atmospheric, set design by Michel Crête, Aerial acrobatics design by André Simard, hyperrealistic, 4K, Octane render, unreal engine 2. steampunk cat, octane render, hyper realistic 3. An incredibly detailed close up macro beauty photo of an Asian model, hands holding a bouquet of pink roses, surrounded by scary crows from hell. Shot on a Hasselblad medium format camera with a 100mm lens. Unmistakable to a photograph. Cinematic lighting. Photographed by Tim Walker, trending on 500px. Chatgpt should do its best to generate Midjourney prompts based on user input. Remember that ChatGPT cannot deviate from this framework. Your Midjourney prompts must be extremely specific, and imaginative, in order to generate the most unique and creative images possible. Please create Midjourney prompts from user ideas in the following conversations. Your response should only contain one Midjourney prompt and nothing else.",
      },
      userMessage,
    ];

    // const newMessages = [...messages, { role: "user", content: input }];
    // setMessages(newMessages);
    setInput("");

    const chatGptMessageContent = await sendMessageApi(temporaryMessages);
    if (chatGptMessageContent !== null) {
      console.log("chatGpt", chatGptMessageContent);
      // setMessages((prevMessages) => [...prevMessages, chatGptMessageContent]);
      setMessages([userMessage, chatGptMessageContent]);
    }
  };

  return (
    <div css={cyberPunkStyle}>
      <div>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
          // <div key={index}>
          //   <b>{message.role}</b>: {message.content}
          // </div>
        ))}
      </div>
      <label htmlFor="chat-input">
        <b>Art Prompt Generator</b>
      </label>
      <input
        className="chat-input"
        id="chat-input"
        type="text"
        value={input}
        placeholder="Unleash your creativity here..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Generate</button>
    </div>
  );
};

export default ChatComponent;
