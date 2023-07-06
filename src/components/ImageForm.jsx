import React from "react";
import { useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import {
  createImage,
  getTaskResult,
  upscaleImage,
} from "../utils/MidjourneyAPI";
import { uploadImage } from "../utils/NFTStorageAPI";
import axios from "axios";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Animator, FrameSVGCorners } from "@arwes/react";
import { Theme } from "../ThemeSettings";
import { createTheme } from "../utils/createTheme";
import { Frame } from "./Frame";

const theme = createTheme({
  outline: 3,
});

const cyberPunkStyle = css`
  position: relative;
  display: inline-block;
  font-family: "Orbitron", sans-serif;
  color: #0ff;
  background: none;
  padding: 20px;
  margin: 0 auto;

  input[type="text"] {
    border: 2px solid #0ff;
    background: transparent;
    color: #0ff;
    padding: 10px;
    margin-bottom: 20px;
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: #0ff;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  input[type="submit"],
  button {
    border: 2px solid #0ff;
    background: transparent;
    color: #0ff;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.5s;
    margin-top: 20px;

    &:hover {
      background: #0ff;
      color: black;
    }
  }

  .formContainer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .imageContainer {
    position: relative;
    width: 1000px;  // 调整为你想要的宽度
    height: 1000px;  // 调整为你想要的高度
    display: flex;  // 新增
    align-items: center;  // 新增
    justify-content: center;  // 新增
    margin-bottom: 1rem;
  }

  .buttonsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .positionContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .imageContainer img,
  .imageContainer .frame {
    position: absolute;
  }

  .imageContainer img {
    max-width: 85%;  
    max-height: 85%;  
  }

  .imageContainer .frame {
    width: 100%;
    height: 100%;
    z-index: -1;
  }  

`;

function ImageForm({
  name,
  setName,
  description,
  setDescription,
  nfturl,
  setNfturl,
  mintImage,
  provider,
  nft,
}) {
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [progress, setProgress] = useState(0);

  const [position, setPosition] = useState(1);
  const [taskId, setTaskId] = useState(null);

  const pollTaskResult = async (taskId) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const result = await getTaskResult(taskId);
          console.log(result); // print the whole result

          if (
            result.status === "pending" ||
            result.status === "waiting-to-start"
          ) {
            // Keep polling, do nothing here
            console.log(result.status); // print the status
          } else if (result.status === "running") {
            const percent = result.percentage;
            setProgress(percent);
          } else if (result.imageURL) {
            clearInterval(interval);
            console.log("image url", result.imageURL); // print the image URL
            resolve(result.imageURL);
          } else {
            // If we received an unknown status or no data at all, reject the promise
            clearInterval(interval);
            reject(
              new Error(
                "Unknown task status or no data: " + JSON.stringify(result)
              )
            );
          }
        } catch (error) {
          console.log(error);
          clearInterval(interval);
          reject(error);
        }
      }, 5000); // Poll every 5 seconds
    });
  };

  const handleUpscale = async () => {
    if (!taskId) {
      setMessage("No image to upload. Please generate an image first.");
      return;
    }
    const upscaleResponse = await upscaleImage(taskId, position);
    if (upscaleResponse && upscaleResponse.imageURL) {
      setImage(upscaleResponse.imageURL);
      console.log("Upscale succeeded, image url", upscaleResponse.imageURL);
    } else {
      console.log("Error occurred during upscaling");
    }
  };

  const handleUploadNFT = async () => {
    if (!image) {
      setMessage("No image to upload. Please generate an image first.");
      return;
    }

    setLoading(true);
    console.log("upscaled image", image);

    // Download the image in the front end
    let response;
    try {
      response = await axios.get(image, {
        responseType: "arraybuffer",
        headers: {
          Accept: "image/png",
        },
      });
    } catch (error) {
      console.error("Failed to download image in the front end:", error);
      setLoading(false);
      return;
    }

    // Send the image data to the backend
    let nftUrl;
    try {
      setMessage("Uploading Image...");

      nftUrl = await uploadImage(response.data, name, description);
    } catch (error) {
      console.error("Failed to upload NFT:", error);
    }

    console.log("nftUrl", nftUrl);
    setNfturl(nftUrl);
    setMessage(
      nftUrl
        ? "Image uploaded successfully as NFT!"
        : "Error uploading the image as NFT. Please try again."
    );
    setTimeout(() => {}, 10000);
    setLoading(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const taskIdResponse = await createImage(description);
    if (taskIdResponse) {
      console.log("taskId", taskIdResponse);
      setTaskId(taskIdResponse);
      pollTaskResult(taskIdResponse)
        .then((imageURL) => {
          setImage(imageURL);
          setLoading(false); // stop loading
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // stop loading
        });
    }
    setProgress(0); // reset progress bar
    setMessage(""); // clear message
  };

  return (
    <div css={cyberPunkStyle}>
      <Animator animate>
        <FrameSVGCorners
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            "& [data-name=bg]": {
              color: `${theme.color.primary(1)} !important`,
            },
            "& [data-name=line]": {
              color: `${theme.color.primary(4)} !important`,
            },
          }}
          strokeWidth={2}
        />
      </Animator>
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              placeholder="Create a name..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Create a description..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <input type="submit" value="Create" />
          </div>
        </form>
        <div className="imageContainer">
        {!loading && image ? (
          <>
              <img src={image} alt="AI Generated Content" />
          </>
          ) : loading ? (
            <>
            <CircularProgressbarWithChildren value={progress}>
              <img
                style={{ width: 40, marginTop: -5 }}
                src="https://i.imgur.com/b9NyUGm.png"
                alt="doge"
              />
              <div style={{ fontSize: 12, marginTop: -5 }}>
                <strong>{progress}%</strong> mate
              </div>
            </CircularProgressbarWithChildren>
            <p>{message}</p>
          </>
          ) : (
            <></>
        )}
        <div className="frame">
            <Frame  />
        </div>
        </div>
      </div>
       {/* buttons */}
      {image && (
      <div className="buttonsContainer">
        <button onClick={handleUploadNFT}>Upload as NFT</button>

        <div className="positionContainer">
          <button
            onClick={() => setPosition(Math.max(1, position - 1))}
            disabled={position === 1}
          >
            {"<"}
          </button>
          <input type="text" value={`Position: ${position}`} readOnly />
          <button
            onClick={() => setPosition(Math.min(4, position + 1))}
            disabled={position === 4}
          >
            {">"}
          </button>
        </div>

        <button onClick={handleUpscale}>Upscale</button>
      </div>
    )}
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

export default ImageForm;
