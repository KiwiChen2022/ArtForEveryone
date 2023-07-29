import { useState } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";

const ChatMessage = ({ message }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const baseSize = 12;
  //   const buttonHeight = `${baseSize * 2.5}px`; // 高度是基准大小的2.5倍

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <b>{message.role}</b>:{" "}
      <Animator active={true}>
        <Text as="p" style={{ color: "#ddd" }}>
          {message.content}
        </Text>
      </Animator>
      {isHovered && (
        <button
          onClick={handleCopy}
          style={{
            fontSize: 12,
            width: `${baseSize * 7}px`, // 宽度是基准大小的7倍
            height: `${baseSize * 2.5}px`, // 高度是基准大小的2.5倍
            display: "flex", // 使用 flex 布局
            alignItems: "center", // 使文本在按钮中垂直居中
            justifyContent: "center", // 使文本在按钮中水平居中
            marginLeft: 10,
            cursor: "pointer",
          }}
        >
          Copy
        </button>
      )}
    </div>
  );
};

export default ChatMessage;
