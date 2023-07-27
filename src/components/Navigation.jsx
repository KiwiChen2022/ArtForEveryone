import { ethers } from "ethers";
import styled from "@emotion/styled";
import eventEmitter from "../utils/eventEmitter";

// create styled components
const Nav = styled.nav`
  color: #0ff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  height: 4rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0ff, transparent);
  }
`;

const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
  margin-right: auto;
  margin-left: 100px;
  color: transparent;
  -webkit-text-stroke: 1px #0ff;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.3),
    0 0 15px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2); // Add one more layer with full opacity
`;

const ConnectButton = styled.button`
  border: 1px solid #0ff;
  background: transparent;
  color: #0ff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.5s;
  margin-left: 20px;

  &:hover {
    background: #0ff;
    color: black;
  }
`;

const LinkIcon = styled.a`
  margin-left: 10px;
  color: #0ff;
  transition: color 0.3s ease;

  &:hover {
    color: darkgreen;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: 100px;
`;

// check MetaMask
const checkMetaMaskInstalled = () => {
  if (!window.ethereum) {
    eventEmitter.emit(
      "apiError",
      "Please install MetaMask to use this application."
    );
    return false;
  }
  return true;
};

// check Network
const expectedChainId = 137;
const expectedNetwork = "Polygon";

const checkNetwork = async (provider) => {
  const network = await provider.getNetwork();
  if (network.chainId !== expectedChainId) {
    eventEmitter.emit(
      "apiError",
      `Please switch network to ${expectedNetwork}`
    );
    return false;
  }
  return true;
};

// use styled components
const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    // Check if the user has MetaMask installed
    if (!checkMetaMaskInstalled()) return;

    // check if the user is on the correct network
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const isCorrectNetwork = await checkNetwork(provider);

    if (!isCorrectNetwork) {
      // Optionally, you could show an error message to the user here
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);

    setAccount(account);
  };

  return (
    <Nav>
      <Brand>
        <h1>AI-ART-NFT </h1>
      </Brand>
      <Actions>
        <LinkIcon
          href="https://github.com/KiwiChen2022"
          target="_blank"
          title="Sponsor"
        >
          <svg
            width="1.5em"
            height="1.5em"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
          >
            <path
              d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
              stroke="currentColor"
              stroke-linejoin="round"
            ></path>
          </svg>
        </LinkIcon>

        {/*  GitHub Icon  */}
        <LinkIcon
          href="https://github.com/KiwiChen2022"
          target="_blank"
          title="Sponsor"
        >
          <svg
            width="1.5em"
            height="1.5em"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
          >
            <path
              d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3"
              stroke="currentColor"
              stroke-linejoin="round"
              storke-strokeLinecap="round"
            ></path>
          </svg>
        </LinkIcon>

        {/* Discord Icon*/}
        <LinkIcon
          href="https://discord.gg/8wZA5p5n"
          target="_blank"
          title="Go to Discord"
        >
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
          >
            <path
              d="M5.5 16c5 2.5 8 2.5 13 0M15.5 17.5l1 2s4.171-1.328 5.5-3.5c0-1 .53-8.147-3-10.5-1.5-1-4-1.5-4-1.5l-1 2h-2"
              stroke="currentColor"
              stroke-linejoin="round"
            ></path>
            <path
              d="M8.528 17.5l-1 2s-4.171-1.328-5.5-3.5c0-1-.53-8.147 3-10.5 1.5-1 4-1.5 4-1.5l1 2h2"
              stroke="currentColor"
              stroke-linejoin="round"
            ></path>
            <path
              d="M8.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zM15.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z"
              stroke="currentColor"
              stroke-linejoin="round"
            ></path>
          </svg>
        </LinkIcon>

        {/* Twitter Icon*/}
        <LinkIcon
          href="https://twitter.com/kiwichen2022"
          target="_blank"
          title="Go to Twitter"
        >
          <svg
            width="1.5em"
            height="1.5em"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
          >
            <path
              d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"
              stroke="currentColor"
              stroke-linejoin="round"
            ></path>
          </svg>
        </LinkIcon>

        {account ? (
          <ConnectButton type="button">
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </ConnectButton>
        ) : (
          <ConnectButton type="button" onClick={connectHandler}>
            Connect
          </ConnectButton>
        )}
      </Actions>
    </Nav>
  );
};

export default Navigation;
