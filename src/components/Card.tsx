import React, { ReactElement } from "react";
import { Animator } from "@arwes/react";
import {
  useBleeps,
  BleepsOnAnimator,
  Animated,
  FrameSVGCorners,
  Text,
  aa,
  aaVisibility,
} from "@arwes/react";
import { Theme } from "../ThemeSettings";
import { createTheme } from "../utils/createTheme";
import { Frame } from "./Frame";

export const Card = (): ReactElement => {
  const bleeps = useBleeps();
  const theme: Theme = createTheme({
    outline: 3,
  });

  return (
    <Animator merge combine manager="stagger">
      {/* Play the intro bleep when card appears. */}
      <BleepsOnAnimator transitions={{ entering: "intro" }} continuous />

      <Animated
        className="card"
        style={{
          position: "relative",
          display: "block",
          maxWidth: "1100px",
          margin: theme.space([4, "auto"]),
          padding: theme.space(4),
          textAlign: "left",
          backgroundColor: "black",
          marginTop: "3rem",
        }}
        // Effects for entering and exiting animation transitions.
        animated={[aaVisibility(), aa("y", "2rem", 0)]}
        // Play bleep when the card is clicked.
        onClick={() => bleeps.click?.play()}
      >
        {/* Frame decoration and shape colors defined by CSS. */}
        <style>{`
            .card .arwes-react-frames-framesvg [data-name=bg] {
              color: ${theme.color.primary(1)};
            }
            .card .arwes-react-frames-framesvg [data-name=line] {
              color: ${theme.color.primary(4)};
            }
          `}</style>

        <Animator>
          <FrameSVGCorners strokeWidth={2} />
        </Animator>

        <Animator>
          <Text as="h4">
            Artistry Unleashed: AI-Powered Custom NFT Creation for Everyone
          </Text>
        </Animator>

        <Animator>
          <Text>
            <p></p>
            Welcome to our innovative AI NFT Web Application, where art meets
            technology in the most extraordinary way. We believe that everyone
            deserves the opportunity to revel in the joy of artistic creation,
            to own a piece of art that is truly unique. That's why we've created
            a platform that merges AI capabilities with blockchain technology,
            allowing you to craft your personalized artwork using AI and prompt,
            and forge it into a one-of-a-kind NFT on the blockchain. Our mission
            is to democratize the world of art, making it accessible, personal,
            and infinitely creative. Dive in and let's lower the barriers to art
            creation together.
          </Text>
        </Animator>
      </Animated>
    </Animator>
  );
};
