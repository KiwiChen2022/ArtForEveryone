import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NixieContainer from "../../components/Nixietube/Nixietube";
import { Card } from "../../components/Card";
import Gallery from "../../components/Gallery";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StartButton = styled.button`
  border: 1px solid #0ff;
  background: transparent;
  color: #0ff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.5s;
  margin-top: 2rem;
  box-shadow: 0 0 10px #0ff;

  &:hover {
    background: #0ff;
    color: black;
    box-shadow: 0 0 15px #0ff;
  }
`;

function GetStartPage({ nft }) {
  const navigate = useNavigate();
  const [totalSupply, setTotalSupply] = useState(0);

  const handleGetStartClick = () => {
    navigate("/main");
  };

  useEffect(() => {
    const fetchTotalSupply = async () => {
      const supply = await nft.totalSupply();
      setTotalSupply(supply.toString());
    };

    fetchTotalSupply();
  }, [nft]);

  const links = [
    {
      image: "/images/image5.jpg",
      title: "Floating Elephants in a Teacup",
      description: "surrealism, floating elephants in a teacup::",
    },
    {
      image: "/images/image6.jpg",
      title: "Emotions",
      description: "abstract art::emotions::ethereal::watercolor style",
    },
    {
      image: "/images/image7.jpg",
      title: "Philosophical Ideas",
      description:
        "abstract art::philosophical ideas, vibrant colors, surrealistic style, influenced by Salvador Dali and Piet Mondrian.",
    },
    {
      image: "/images/image8.jpg",
      title: "A Dreamy Profile in Anime Style",
      description:
        "anime style, profile view, girl's upper body, dreamy atmosphere, glowing lights, ethereal colors, soft brush strokes, digital painting technique",
    },
    {
      image: "/images/image1.jpg",
      title: "Profile closeup of a cyberpunk man",
      description:
        "cyberpunk:: boy, close-up, neon lights, glitch effects, art style: digital painting by Sparth, 4K resolution, Unreal Engine render",
    },
    {
      image: "/images/image2.jpg",
      title: "Profile photo in the style of Makoto Shinkai",
      description:
        "anime style, dreamy profile, soft pastel colors, background of cherry blossoms, artist style by Makoto Shinkai",
    },
    {
      image: "/images/image3.jpg",
      title: "Victorian Impressions in Monet's Palette",
      description:
        "victorian era, oil painting, opulent ballroom, impressionist art style, Monet's color palette",
    },
    {
      image: "/images/image4.jpg",
      title: "Dancer",
      description:
        "a ballet dancer gracefully twirling amidst a tornado, captured in a surreal and ethereal art style by Margarita Kareva, known for her whimsical and dreamlike photography. Rendered in high resolution with vibrant colors and delicate details.",
    },
    {
      image: "/images/image9.jpg",
      title: "Lightning Warrior",
      description:
        "a Lightning Warrior:: digital painting, dynamic and energetic, art style inspired by anime/manga, background with stormy clouds and electric bolts, artist style of Kuvshinov Ilya",
    },
    {
      image: "/images/image10.jpg",
      title: "Flame Demon",
      description:
        "A fire elemental:: engulfed in flames, casting a blazing light, surrounded by swirling embers and sparks. Art style inspired by Studio Ghibli, with vibrant colors and soft, ethereal textures.",
    },
    {
      image: "/images/image11.jpg",
      title: "Cronus' Devouring",
      description:
        "myths and legends::Greek mythology::Cronus devouring his children, atmospheric, oil painting, high contrast, Caravaggio-inspired lighting, dramatic shadows",
    },
    {
      image: "/images/image12.jpg",
      title: "Water Elemental Fairy",
      description:
        "Water Elemental Fairy, anime style, vibrant colors, flowing water effects, art style by Akihiko Yoshida, 4K resolution, digital painting",
    },
  ];

  const length = links.length;
  const newLength = length - (length % 4); // 计算新的数组长度，使之为4的倍数
  const midjourneyimages = links.slice(0, newLength);

  return (
    <Container>
      <Gallery images={midjourneyimages} totalSupply={totalSupply} />
      <StartButton onClick={handleGetStartClick}>Get Start</StartButton>
      {/* <Card /> */}
      {/* <NixieContainer number={totalSupply} /> */}
    </Container>
  );
}

export default GetStartPage;
