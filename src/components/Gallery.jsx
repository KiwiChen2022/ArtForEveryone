import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { GalleryBackground } from "./GalleryBackground";
import { GalleryFrame } from "./GalleryFrame";
import GalleryImg from "./GalleryImg";
import { useTransition, animated } from "react-spring";
import { useSprings } from "react-spring";
import NixieContainer from "./Nixietube/Nixietube";

const GalleryContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  width: 100%; // Full width of its parent
  height: 50vh; // Half of the viewport height

  @media (min-width: 768px) {
    height: 70vh; // Increase height for larger screens
  }

  background: none; // Modify as needed
  color: #0ff; // Cyberpunk style text color
  margin-bottom: 1rem; // Space between Gallery and NixieContainer
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem; // Add padding on the sides
`;

const Title = styled.h1`
  color: transparent;
  -webkit-text-stroke: 1px #0ff;
  user-select: none; // Prevent user from selecting the text
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.3),
    0 0 15px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2);
`;

const ScrollButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: 1px solid #0ff;
  background: transparent;
  color: #0ff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.5s;
  margin-top: 2rem;

  &:hover {
    background: #0ff;
    color: black;
  }
`;

const ImagesRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 3rem;
  margin-right: 3rem;
`;

const Image = styled.img`
  width: 20%;
  height: auto;
`;

const Gallery = ({ images, totalSupply }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePreviousClick = () => {
    setCurrentIndex((oldIndex) => {
      if (oldIndex >= 4) {
        return oldIndex - 4;
      } else {
        return Math.max(
          0,
          images.length - (((images.length - oldIndex) % 4) + 4)
        );
      }
    });
  };

  const handleNextClick = () => {
    setCurrentIndex((oldIndex) => {
      if (oldIndex <= images.length - 8) {
        // Leave enough images to fill the row
        return oldIndex + 4;
      } else {
        return 0; // Loop back to the beginning
      }
    });
  };

  // When the list of images changes, ensure the current index is still valid
  useEffect(() => {
    if (currentIndex > images.length - 4) {
      setCurrentIndex(images.length - 4);
    }
  }, [images, currentIndex]);

  return (
    <GalleryContainer>
      <GalleryFrame />
      <Header>
        <Title>Gallery</Title>
        <ScrollButtons>
          <Button onClick={handlePreviousClick}>{"<"}</Button>
          <Button onClick={handleNextClick}>{">"}</Button>
        </ScrollButtons>
      </Header>
      <ImagesRow>
        {images.slice(currentIndex, currentIndex + 4).map((src, index) => (
          <GalleryImg
            image={src}
            title={`Image ${index + 1}`}
            description={`Description ${index + 1}`}
          />
        ))}
      </ImagesRow>
      <NixieContainer number={totalSupply} />
    </GalleryContainer>
  );
};

export default Gallery;
