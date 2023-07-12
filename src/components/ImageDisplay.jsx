import { Frame } from "./Frame";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ImageDisplay({ image, loading, progress }) {
  return (
    <div className="imageContainer">
      {!loading && image ? (
        <>
          <img src={image} alt="AI Generated Content" />
        </>
      ) : loading ? (
        <div style={{ textAlign: "center", padding: "2em" }}>
          <Spinner animation="border" role="status" variant="info" />
          <p style={{ fontSize: 20, marginTop: -5 }}>
            <strong>{progress}%</strong>
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className="frame">
        <Frame />
      </div>
    </div>
  );
}
