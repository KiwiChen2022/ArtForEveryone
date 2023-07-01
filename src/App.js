import { useState, useEffect } from "react";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import axios from "axios";

// Components
import Spinner from "react-bootstrap/Spinner";
import Navigation from "./components/Navigation";

// ABIs
import NFT from "./abis/NFT.json";

// Config
import config from "./config.json";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [progress, setProgress] = useState(0);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const nft = new ethers.Contract(
      config[network.chainId].nft.address,
      NFT,
      provider
    );
    setNFT(nft);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (name === "" || description === "") {
    //   window.alert("Please provide a name and description");
    //   return;
    // }

    setLoading(true);

    const imageData = await createImage();

    // console.log("image created");

    // await mintImage(metadataUrl);
    // console.log("image minted");

    setMessage(""); // clear message
  };

  const createImage = async () => {
    setMessage("Creating image...");
    const taskId = await imagineReq();
    getTaskResult(taskId);
  };

  const imagineReq = async () => {
    setMessage("Creating image...");

    const data = JSON.stringify({
      // "callbackURL": "https://....", // Optional
      prompt: "a boy laughing on the beach, 8k, --ar 3:2",
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.midjourneyapi.io/v2/imagine",
      headers: {
        Authorization: `${process.env.REACT_APP_MIDJOURNEY_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    let taskId;

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      taskId = response.data.taskId; // assuming the taskId is directly on the response object
    } catch (error) {
      console.log(error);
    }
    return taskId;
  };

  const getTaskResult = async (Id) => {
    try {
      const taskId = Id;
      const result = await resultReq(taskId);
      console.log(result);
      setImage(result.imageURL);
      setLoading(false); // stop loading

      const imageData = await fetch(result.imageURL).then((r) =>
        r.arrayBuffer()
      );
      const metadataUrl = await uploadImage(imageData);
      console.log("image uploaded", metadataUrl);
    } catch (error) {
      console.error("Error getting task result:", error);
    }
  };

  const resultReq = async (taskId) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const resultData = JSON.stringify({ taskId });
        const resultConfig = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api.midjourneyapi.io/v2/result",
          headers: {
            Authorization: `${process.env.REACT_APP_MIDJOURNEY_API_KEY}`,
            "Content-Type": "application/json",
          },
          data: resultData,
        };

        try {
          const resultResponse = await axios.request(resultConfig);
          console.log(JSON.stringify(resultResponse.data));

          if (resultResponse.data.status === "running") {
            const percent = resultResponse.data.percentage;
            setProgress(percent);
          }

          if (resultResponse.data.imageURL) {
            clearInterval(interval);
            resolve(resultResponse.data);
          }
        } catch (error) {
          console.log(error);
          clearInterval(interval);
          reject(error);
        }
      }, 10000); // try every 10 seconds
    });
  };

  // upload image to NFT Storage
  const uploadImage = async (imageData) => {
    setMessage("Uploading image...");

    // initialize NFT Storage
    const nftStorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    // store image
    const { ipnft } = await nftStorage.store({
      image: new File([imageData], "image.png", { type: "image/png" }),
      name: name,
      description: description,
    });

    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setUrl(url);
    return url;
  };

  const mintImage = async (metadataUrl) => {
    setMessage("Minting image...");

    const signer = provider.getSigner();
    const tx = await nft
      .connect(signer)
      .mint(metadataUrl, { value: ethers.utils.parseEther("1") });

    const receipt = await tx.wait();
    console.log("Minted image:", receipt);
  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
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
            <input type="submit" value="Create & Mint" />
          </div>
        </form>

        {!loading && image ? (
          <div className="image">
            <img src={image} alt="AI Generated Image" />
          </div>
        ) : loading ? (
          <>
            <CircularProgressbarWithChildren value={progress}>
              {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
              <img
                style={{ width: 40, marginTop: -5 }}
                src="https://i.imgur.com/b9NyUGm.png"
                alt="doge"
              />
              <div style={{ fontSize: 12, marginTop: -5 }}>
                <strong>{progress}%</strong> mate
              </div>
            </CircularProgressbarWithChildren>
            ;<p>{message}</p>
          </>
        ) : (
          <></>
        )}
      </div>

      {!loading && url ? (
        <p>
          View&nbsp;
          <a href={url} target="_blank" rel="noreferrer">
            Metadata
          </a>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
