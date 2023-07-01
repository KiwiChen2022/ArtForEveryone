import React, { useState } from "react";
import axios from "axios";
import { sendMessageApi } from "../utils/ChatgptAPI";

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
      //   const chatGptMessage = {
      //     role: "assistant",
      //     content: chatGptMessageContent,
      //   };

      console.log("chatGpt", chatGptMessageContent);
      setMessages((prevMessages) => [...prevMessages, chatGptMessageContent]);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <b>{message.role}</b>: {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
