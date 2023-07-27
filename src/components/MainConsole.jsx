import React from "react";
import { useState } from "react";
import {
  createImage,
  getTaskResult,
  upscaleImage,
} from "../utils/MidjourneyAPI";
import { uploadImage } from "../utils/NFTStorageAPI";
import { mintImage } from "../utils/Blockchain";
import axios from "axios";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Animator, FrameSVGCorners } from "@arwes/react";
import { createTheme } from "../utils/createTheme";
import ChatComponent from "./ChatComponent";
import eventEmitter from "../utils/eventEmitter";
import ImageForm from "./ImageForm";
import ImageDisplay from "./ImageDisplay";
import ButtonsContainer from "./ButtonsContainer";

const theme = createTheme({
  outline: 3,
});

const cyberPunkStyle = css`
  position: relative;
  font-family: "Orbitron", sans-serif;
  color: #0ff;
  background: none;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  min-height: 90vh;

  a {
    color: #0ff;
    text-decoration: none;
    border: 2px solid #0ff;
    padding: 5px 10px;
    display: inline-block;
    transition: background 0.5s;
    &:hover {
      background: #0ff;
      color: black;
    }
  }

  input[type="text"],
  textarea {
    border: 2px solid #0ff;
    background: transparent;
    color: #0ff;
    padding: 10px;
    margin-bottom: 20px;
    outline: none;
    width: 80%; //设置默认宽度为50%
    min-width: 120px; //设置最小宽度
    max-width: 100%; //设置最大宽度
    box-sizing: border-box;
    overflow: auto; //当文本过长时，显示滚动条

    &::placeholder {
      color: #0ff;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  textarea {
    height: 100px; // 设置textarea的默认高度
    resize: none; // 禁止textarea的拖动
  }

  input[type="submit"],
  button,
  input[type="button"] {
    border: 2px solid #0ff;
    background: transparent;
    color: #0ff;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.5s;
    margin-top: 10px;

    &:hover {
      background: #0ff;
      color: black;
    }
  }

  button {
    width: 160px;
    box-shadow: 0 0 5px #0ff;
  }

  .formContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 10;
  }

  .formContainer__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: 300px;
    flex: 4;
  }

  .formContainer input[type="text"] {
    font-size: 1rem;
  }

  form input[type="submit"] {
    display: block;
  }
`;

function MainConsole({ provider, nft, account, setMessage }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nfturl, setNfturl] = useState(null);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [position, setPosition] = useState(1);
  const [taskId, setTaskId] = useState(null);

  const pollTaskResult = async (taskId) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const result = await getTaskResult(taskId);
          console.log(result); // print the whole result

          if (!result || Object.keys(result).length === 0) {
            // Handle empty response, keep polling
            console.log("Empty response, keep polling.");
          } else if (
            result.status === "pending" ||
            result.status === "paused" ||
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
            setProgress(0);
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
          const temp = error.message || "Error";
          eventEmitter.emit("apiError", temp);
          clearInterval(interval);
          reject(error);
        }
      }, 8000); // Poll every 8 seconds
    });
  };

  const handleUpscale = async () => {
    if (!taskId) {
      setMessage("No image to upscale. Please generate an image first.");
      return;
    }
    const upscaleResponse = await upscaleImage(taskId, position);
    if (upscaleResponse && upscaleResponse.imageURL) {
      setImage(upscaleResponse.imageURL);
      console.log("Upscale succeeded, image url", upscaleResponse.imageURL);
    } else {
      console.log("Error occurred during upscaling");
      console.log(upscaleResponse);
    }
  };

  const handleUploadNFT = async () => {
    if (!image) {
      setMessage("No image to upload. Please generate an image first.");
      return;
    }

    if (!provider || !account) {
      setMessage("Please connect your wallet first.");
      console.log("Please connect your wallet first.");
      return;
    }

    if (!name || !description) {
      setMessage("Please enter name and description.");
      console.log("Please enter name and description.");
      return;
    }

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
      const temp = error.message || "Error";
      eventEmitter.emit("apiError", temp);
      return;
    }

    // Send the image data to the backend
    let nftUrl;
    try {
      setMessage("Uploading Image...");

      nftUrl = await uploadImage(response.data, name, description);
    } catch (error) {
      console.error("Failed to upload NFT:", error);
      const temp = error.message || "Error";
      eventEmitter.emit("apiError", temp);
    }

    console.log("nftUrl", nftUrl);
    setNfturl(nftUrl);
    setMessage(
      nftUrl
        ? "Image uploaded successfully as NFT!"
        : "Error uploading the image as NFT. Please try again."
    );
    try {
      await mintImage(provider, nft, nftUrl);
      setMessage("NFT minted successfully!");
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      const temp = error.message || "Error";
      eventEmitter.emit("apiError", temp);
    }
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
    setMessage(null); // clear message
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
              // color: `${theme.color.primary(1)} !important`,
              color: `hsla(180, 75%, 10%,0.4) !important`,
              // color: "rgba(0, 0, 0, 0.4) !important",
            },
            "& [data-name=line]": {
              // color: `${theme.color.primary(10)} !important`,
              color: `hsla(180, 75%, 60%,1) !important`,
              // stroke: "#007f7f", // Dark line color
            },
          }}
          strokeWidth={2}
        />
      </Animator>
      <div className="formContainer">
        <div className="formContainer__left">
          <ChatComponent />
          <ImageForm
            setName={setName}
            setDescription={setDescription}
            submitHandler={submitHandler}
          />
        </div>
        <ImageDisplay image={image} loading={loading} progress={progress} />
      </div>

      <ButtonsContainer
        loading={loading}
        handleUpscale={handleUpscale}
        position={position}
        setPosition={setPosition}
        handleUploadNFT={handleUploadNFT}
        nfturl={nfturl}
      />
    </div>
  );
}

export default MainConsole;
