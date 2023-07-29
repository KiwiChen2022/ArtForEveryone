/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";
import { swapFace } from "../utils/MidjourneyAPI";
import { FaceSwapMessage } from "./FaceSwapMessage";

const buttonsContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 新增
  flex: 3;

  .positionContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .positionContainer input[type="text"] {
    padding: 0;
    text-align: center;
    background: transparent;
    line-height: 4; /* 调整这个值以改变文本的垂直位置 */
    font-size: 1rem;
    margin: 20px;
    margin-top: 30px;
  }
`;

export default function ButtonsContainer({
  loading,
  handleUpscale,
  position,
  setPosition,
  handleUploadNFT,
  nfturl,
  image,
}) {
  const fileInputRef = useRef(); // 创建一个ref来访问文件输入元素
  const [message, setMessage] = useState(null);

  // 创建一个新的事件处理函数
  const handleSwapFace = async () => {
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const response = await swapFace(file, image);
      console.log(response);
      // 处理响应...
      const message = `For security and privacy reasons, we currently do not support the minting of NFTs for face swap image. You can download the image <a href=${response.url}>here</a>`;
      setMessage(message);
    }
  };

  return (
    <div css={buttonsContainerStyle}>
      <button onClick={handleUpscale}>Upscale</button>

      <div className="positionContainer">
        <input
          type="button"
          value="<"
          onClick={() => setPosition(Math.max(1, position - 1))}
          disabled={position === 1}
        />
        <input type="text" value={`Position: ${position}`} readOnly />
        <input
          type="button"
          value=">"
          onClick={() => setPosition(Math.min(4, position + 1))}
          disabled={position === 4}
        />
      </div>

      {/* 添加一个新的按钮和文件输入元素 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleSwapFace}
      />
      <button onClick={() => fileInputRef.current.click()}>Swap Face</button>

      <button
        onClick={handleUploadNFT}
        style={{
          marginTop: "100px",
          marginBottom: "20px",
        }}
      >
        Mint
      </button>
      {!loading && nfturl ? (
        <p>
          View&nbsp;
          <a href={nfturl} target="_blank" rel="noreferrer">
            Metadata
          </a>
        </p>
      ) : (
        <></>
      )}
      {message && (
        <FaceSwapMessage
          message={message}
          onClose={() => {
            setMessage(null);
          }}
        />
      )}
    </div>
  );
}
