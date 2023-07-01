import React from "react";
import { useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { createImage, getTaskResult } from "../utils/MidjourneyAPI";
import { uploadNFT } from "../utils/NFTStorageAPI";

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

  const handleUploadNFT = async () => {
    if (!image) {
      setMessage("No image to upload. Please generate an image first.");
      return;
    }

    setLoading(true);
    const nftUrl = await uploadNFT(image, name, description);
    setNfturl(nftUrl);
    setLoading(false);
    console.log("nftUrl", nftUrl);
    setMessage(
      nftUrl
        ? "Image uploaded successfully as NFT!"
        : "Error uploading the image as NFT. Please try again."
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const taskId = await createImage(description);
    if (taskId) {
      console.log("taskId", taskId);
      pollTaskResult(taskId)
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
    <div className="form">
      <form onSubmit={submitHandler}>
        <div className="form-group">
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
      <button onClick={handleUploadNFT}>Upload as NFT</button>

      {!loading && image ? (
        <div className="image">
          <img src={image} alt="AI Generated Content" />
        </div>
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
