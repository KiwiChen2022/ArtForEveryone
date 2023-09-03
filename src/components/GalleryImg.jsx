import React from "react";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  background-color: rgba(0, 255, 255, 0.05);
  border: 2px solid #0ff;
  border-radius: 5px;
  color: #0ff;
  overflow: hidden;
  position: relative;
  margin: 3rem;
  flex: 1;

  box-shadow: 0 0 5px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.6),
    0 0 15px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.6);
`;

const Image = styled.img`
  width: 100%;
  height: 150px; // Default height for small screens
  object-fit: cover;

  @media (min-width: 768px) {
    height: 150px; // Increase height for medium screens
  }

  @media (min-width: 1200px) {
    height: 200px; // Increase height for large screens
  }

  @media (min-width: 1800px) {
    height: 300px; // Height for extra large screens
  }
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GalleryImg = React.memo(({ image, title, description }) => {
  return (
    <CardContainer>
      <Image src={image} alt={title} loading="lazy" />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </CardContainer>
  );
});

export default GalleryImg;
