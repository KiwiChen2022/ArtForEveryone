import React, { type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { IlluminatorSVG } from "@arwes/react-frames";

export const Illuminator = (): ReactElement => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <svg
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1 1"
      >
        <IlluminatorSVG color="hsl(180 50% 50% / 20%)" size={1} />
      </svg>
    </div>
  );
};
