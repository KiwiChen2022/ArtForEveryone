import { Frame } from "./Frame";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const imageContainerStyle = css`
  position: relative;
  min-width: 70vh;
  flex: 7;
  margin-bottom: 1rem;
  overflow: hidden;

  img {
    position: relative;
    max-width: 85%;
    max-height: 85%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

const loadingContainerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

const textContainerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const variants = {
  hidden: { height: 0 },
  visible: { height: "80vh" },
};

export default function ImageDisplay({ image, loading, progress }) {
  const [textActive, setTextActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setTextActive((active) => true), 600);
  }, []);

  return (
    <motion.div
      css={imageContainerStyle}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      {!loading && image ? (
        <>
          <img src={image} alt="AI Generated Content" />
        </>
      ) : loading ? (
        <div style={loadingContainerStyle}>
          <Spinner animation="border" role="status" variant="info" />
          <p style={{ fontSize: 20, marginTop: 10 }}>
            <strong>{progress}%</strong>
          </p>
        </div>
      ) : (
        <div style={textContainerStyle}>
          <Animator active={textActive}>
            <Text as="h5" style={{ color: "#D3D3D3" }}>
              Generate Your NFT Artwork Here!
            </Text>
          </Animator>
        </div>
      )}
      <div className="frame">
        <Frame />
      </div>
    </motion.div>
  );
}
