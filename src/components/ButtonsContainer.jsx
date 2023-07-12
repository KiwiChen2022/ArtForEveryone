export default function ButtonsContainer({
  loading,
  handleUpscale,
  position,
  setPosition,
  handleUploadNFT,
  nfturl,
}) {
  return (
    <div className="buttonsContainer">
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
