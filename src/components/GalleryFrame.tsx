import React, { type ReactElement, useMemo } from "react";
import { type FrameSVGPathGeneric } from "@arwes/frames";
import { FrameSVG } from "@arwes/react-frames";

export const GalleryFrame = (): ReactElement => {
  const paths: FrameSVGPathGeneric[] = useMemo(
    () => [
      // Background shape.
      {
        name: "bg",
        style: {
          strokeWidth: 0,
          fill: "rgba(0, 0, 0, 0.2)", // Very transparent background
          filter: "drop-shadow(0 0 2px hsl(180, 75%, 10%))",
        },
        path: [
          ["M", 10, 10],
          ["L", 10, "100% - 10"],
          ["L", "100% - 10", "100% - 10"],
          ["L", "100% - 10", 10],
          ["L", 10, 10], // Close the path
        ],
      },
      // Outer decoration.
      {
        name: "line",
        style: {
          strokeWidth: "2",
          stroke: "#007f7f", // Dark line color
          fill: "none",
          filter: "drop-shadow(0 0 2px hsl(180, 75%, 10%))",
        },
        path: [
          ["M", 10, 10],
          ["L", "100% - 10", 10],
          ["L", "100% - 10", "100% - 10"],
          ["L", 10, "100% - 10"],
          ["L", 10, 10], // Close the path
        ],
      },
    ],
    []
  );

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
      <FrameSVG paths={paths} />
    </div>
  );
};
