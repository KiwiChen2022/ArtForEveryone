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
    "https://cdn.midjourney.com/9b5ee37c-0d3b-482d-a88c-a57452e842d9/0_2.png",
    "https://cdn.midjourney.com/c7f3c063-6c2e-47e7-bb16-051922ea18f2/0_0.png",
    "https://cdn.midjourney.com/5cb56820-113b-4c96-925e-330c3b24a8ce/0_3.png",
    "https://cdn.midjourney.com/c7b8a50a-8bdf-4c56-ba55-64b4cbf5b56e/0_2.png",
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
