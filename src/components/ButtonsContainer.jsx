/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
}) {
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

      <button onClick={handleUploadNFT}>Mint</button>
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
    </div>
  );
}
