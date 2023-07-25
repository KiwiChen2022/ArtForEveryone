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

  &:hover {
    background: #0ff;
    color: black;
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
    "https://cdn.midjourney.com/0332860c-29a2-4c9c-9004-2345a3665ba8/0_2.png",
    "https://cdn.midjourney.com/d818056b-47b4-49f3-98c2-5e3db22e19d0/0_1.png",
    "https://cdn.midjourney.com/cc125b23-2f98-41cb-bcad-499f10acb1ed/0_3.png",
    "https://cdn.midjourney.com/4f50f4b5-f449-4a75-a88b-66bc0907de41/0_0.png",
    "https://cdn.midjourney.com/e67caceb-29cf-4d55-9d1e-0e4137fbc6bb/0_2.png",
    "https://cdn.midjourney.com/6fb3eafa-55e4-4732-8b83-6c26e916a111/0_3.png",
    "https://cdn.midjourney.com/6825c506-9b74-41d7-aed9-e71356c41c24/0_0.png",
    "https://cdn.midjourney.com/31db82fa-20fc-4352-8afa-18a7b642a4d4/0_1.png",
    "https://cdn.midjourney.com/ddb8ea74-4ce4-4aa4-967f-7352b762e95a/0_1.png",
    "https://cdn.midjourney.com/793c0e2b-cb49-46c4-9d26-66526c3d76f1/0_1.png",
    "https://cdn.midjourney.com/ee573c6b-5e79-473a-a821-501457859378/0_1.png",
    "https://cdn.midjourney.com/6311491b-01ac-4efd-94db-156afdc5c4b3/0_1.png",
    "https://cdn.midjourney.com/e6e7ebfd-5374-416a-a8e7-094432aa175a/0_3.png",
    "https://cdn.midjourney.com/7018a23f-98e6-436e-9fb3-05627727cac7/0_2.png",
    "https://cdn.midjourney.com/41467d13-e003-49be-8293-87c0a39a0add/0_1.png",
    "https://cdn.midjourney.com/f37a8593-88b1-4dc9-a632-4d6b258c2be9/0_0.png",
    "https://cdn.midjourney.com/4f9994b2-18dc-4101-8855-4fad37e26bf6/0_3.png",
    "https://cdn.midjourney.com/4770ce45-7f0f-452d-a1c2-22c7ded3f7bc/0_2.png",
    "https://cdn.midjourney.com/a6879c9d-f33d-4cd7-9275-ab240a3a4493/0_1.png",
    "https://cdn.midjourney.com/fbf50caa-dd72-4a23-bd78-ff93997a6354/0_0.png",
    "https://cdn.midjourney.com/4fe9dcae-382c-4bab-beb2-fba065621d5f/0_3.png",
    "https://cdn.midjourney.com/7723b3c6-cbbb-430d-bd39-9ed4a8838155/0_0.png",
    "https://cdn.midjourney.com/af933d0e-90e7-4f1e-88f4-a11a59645984/0_1.png",
    "https://cdn.midjourney.com/37297a3d-e9d9-4a44-9caf-bb70837b4ead/0_3.png",
    "https://cdn.midjourney.com/dabfaf5b-fc64-4bd0-b2e3-47d992dda91f/0_2.png",
    "https://cdn.midjourney.com/3234abb2-7fad-4c31-af42-ec300e84f0ac/0_3.png",
    "https://cdn.midjourney.com/ff512c55-8769-4db2-995e-83cd59e0c079/0_1.png",
    "https://cdn.midjourney.com/facb4f01-1318-4460-85fe-92c32ef36c48/0_1.png",
    "https://cdn.midjourney.com/427e8bfe-ce55-4783-a38b-1651a8d29f11/0_0.png",
    "https://cdn.midjourney.com/b98a83a6-f77c-4a07-b6be-fe1b3074209d/0_1.png",
    "https://cdn.midjourney.com/bf58a119-ef0a-4046-b386-f7c5c37968d8/0_3.png",
    "https://cdn.midjourney.com/2d073c63-992b-4a5e-8182-d042389553e0/0_0.png",
    "https://cdn.midjourney.com/4936fb5f-a884-4778-85cc-6d059566cf0a/0_3.png",
    "https://cdn.midjourney.com/dc3fb1e0-4328-4773-8f73-1725ad2cbb0a/0_1.png",
    "https://cdn.midjourney.com/d795c340-f2e9-40b9-bcbc-a023bb487f13/0_2.png",
    "https://cdn.midjourney.com/7c6d5fdb-acfc-4725-92f7-17ccc32f20d8/0_1.png",
    "https://cdn.midjourney.com/ca818357-29ed-4f86-bc64-953e62941a7b/0_3.png",
    "https://cdn.midjourney.com/9e8a8ce5-1a0d-4b76-a455-587c4cced15e/0_2.png",
    "https://cdn.midjourney.com/e3430c04-0251-4a88-b0b0-c2c225fe240f/0_2.png",
    "https://cdn.midjourney.com/34cf1150-114d-4790-9075-6e3d4a037241/0_1.png",
    "https://cdn.midjourney.com/e81a570d-73b3-46d1-8366-42c2971e494f/0_3.png",
    "https://cdn.midjourney.com/309f536f-4292-4799-ba2b-788ceb678a6b/0_2.png",
    "https://cdn.midjourney.com/f3c08b9b-8ab2-4062-8ce8-025184bfec12/0_3.png",
    "https://cdn.midjourney.com/17c84a14-2971-43ab-819f-e3b6dcbc4dc2/0_0.png",
    "https://cdn.midjourney.com/8d478f4c-ccf2-4a71-8a67-069a7203a15a/0_0.png",
    "https://cdn.midjourney.com/b16cad5e-767b-400a-b8f1-e7ab4dae9656/0_0.png",
    "https://cdn.midjourney.com/8193f199-8d21-49cd-b7e7-f78905e05b5d/0_3.png",
    "https://cdn.midjourney.com/f79cba8c-03eb-4b64-8654-f88dec321752/0_2.png",
    "https://cdn.midjourney.com/e6a06b5c-df12-463c-bb54-9db09a26ab44/0_2.png",
    "https://cdn.midjourney.com/2c86d722-5ced-4109-adc9-85f24a9a9ee6/0_1.png",
    "https://cdn.midjourney.com/165ad135-e402-4064-bf9c-1255f143eb43/0_3.png",
    "https://cdn.midjourney.com/f9a8c1a3-1c74-4021-bc70-de458493d271/0_3.png",
    "https://cdn.midjourney.com/6e2d3f56-1805-4425-9ed8-8e1a19344de1/0_0.png",
    "https://cdn.midjourney.com/fb25d1d7-7cf9-47a7-bd6e-53920a1f5ebf/0_1.png",
    "https://cdn.midjourney.com/a5a46a2b-e57c-4d26-a081-9525ded61884/0_3.png",
    "https://cdn.midjourney.com/6d871a8f-a196-443f-83d8-8db508a57925/0_3.png",
    "https://cdn.midjourney.com/35de2a07-db38-45a9-934b-73555ec15da1/0_0.png",
    "https://cdn.midjourney.com/6d0cf962-7b1d-4488-a330-205f50ddf980/0_0.png",
    "https://cdn.midjourney.com/2eb39efc-d76b-4c0a-99e7-3acbcef5b183/0_2.png",
    "https://cdn.midjourney.com/cbed5bda-bdb9-456c-bba1-4f347394f478/0_1.png",
    "https://cdn.midjourney.com/20a20d0c-3aa9-4f51-9e34-a83ee9c85136/0_2.png",
    "https://cdn.midjourney.com/ab1d5aab-9682-4761-b7bc-2afc3343093b/0_3.png",
    "https://cdn.midjourney.com/84d9dfde-6925-4607-bd07-e8a677b1a10f/0_2.png",
  ];
  const length = links.length;
  const newLength = length - (length % 4); // 计算新的数组长度，使之为4的倍数
  const midjourneyimages = links.slice(0, newLength);
  // const images = [
  //   "https://source.unsplash.com/random/200x200?sig=1",
  //   "https://source.unsplash.com/random/200x200?sig=2",
  //   "https://source.unsplash.com/random/200x200?sig=3",
  //   "https://source.unsplash.com/random/200x200?sig=4",
  //   "https://source.unsplash.com/random/200x200?sig=5",
  //   "https://source.unsplash.com/random/200x200?sig=6",
  //   "https://source.unsplash.com/random/200x200?sig=7",
  //   "https://source.unsplash.com/random/200x200?sig=8",
  // ];
  return (
    <Container>
      <Gallery images={midjourneyimages} />
      <NixieContainer number={totalSupply} />
      <StartButton onClick={handleGetStartClick}>Get Start</StartButton>
      <Card />
    </Container>
  );
}

export default GetStartPage;
