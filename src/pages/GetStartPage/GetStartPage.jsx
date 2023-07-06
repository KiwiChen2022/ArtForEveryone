import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NixieContainer from "../../components/Nixietube/Nixietube";
import { Card } from "../../components/Card";


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

  &:hover {
    background: #0ff;
    color: black;
  }
`;

function GetStartPage() {
  const navigate = useNavigate();

  const handleGetStartClick = () => {
    navigate("/main");
  };

  return (
    <Container>
      <Card />
      <NixieContainer number={1} />
      <StartButton onClick={handleGetStartClick}>Get Start</StartButton>
    </Container>
  );
}

export default GetStartPage;
