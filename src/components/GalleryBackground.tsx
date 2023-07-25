import React, { type ReactElement, useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { type FrameSVGPathGeneric } from "@arwes/frames";
import { FrameSVG } from "@arwes/react-frames";
import { css } from "@emotion/react";
import { Animator } from "@arwes/react-animator";
import {
  FrameSVGUnderline,
  useFrameSVGAssemblingAnimation,
} from "@arwes/react-frames";
import styled from "@emotion/styled";

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  [data-name="bg"] {
    color: hsla(180, 75%, 10%, 0.5);
  }
  [data-name="line"] {
    color: hsl(180, 75%, 50%);
  }
`;

export const GalleryBackground = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  return (
    <Animator active={true}>
      <StyledDiv>
        <FrameSVGUnderline elementRef={svgRef} onRender={onRender} />
      </StyledDiv>
    </Animator>
  );
};
