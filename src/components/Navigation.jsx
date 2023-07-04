import { ethers } from 'ethers';
import styled from '@emotion/styled';

// 创建 styled components
const Nav = styled.nav`
    color: lime;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 80%; 
`;

const Brand = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0 0 10px lime, 0 0 20px lime, 0 0 30px lime, 0 0 40px lime;
    user-select: none;
`;

const ConnectButton = styled.button`
    border: 1px solid lime;
    background: transparent;
    color: lime;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.5s;
    margin-left: 20px;

    &:hover {
        background: lime;
        color: black;
    }
`;

const LinkIcon = styled.a`
    margin-left: 10px; // 根据需要调整间距
    color: lime; // 或者你喜欢的任何颜色
    transition: color 0.3s ease;

    &:hover {
        color: darkgreen; // hover颜色，可自定义
    }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // 调整为需要的间距
`;




// 使用 styled components
const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
    }

    const linkHTML = `<li class="_1izpm6h0 _1t4ewsk0" style="visibility: visible; opacity: 1;"><a href="https://github.com/sponsors/romelperez" target="sponsor" title="Sponsor"><svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z" stroke="currentColor" stroke-linejoin="round"></path></svg></a></li>...`;


    return (
        <Nav>
            <Brand>
                <h1>AI NFT Generator</h1>
            </Brand>
            <Actions>
            <LinkIcon href="https://github.com/sponsors/romelperez" target="_blank" title="Sponsor">
                {/* 这里是第一个SVG */}
                <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                <path d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z" stroke="currentColor" stroke-linejoin="round"></path>
                </svg>
            </LinkIcon>

             {/*  GitHub Icon  */}
      <LinkIcon href="https://github.com/sponsors/romelperez" target="_blank" title="Sponsor">
        <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          <path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3" stroke="currentColor" stroke-linejoin="round" storke-strokeLinecap='round'></path>
        </svg>
      </LinkIcon>

      {/* Discord Icon*/}
      <LinkIcon href="https://discord.gg/s5sbTkw" target="_blank" title="Go to Discord">
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
        <path d="M5.5 16c5 2.5 8 2.5 13 0M15.5 17.5l1 2s4.171-1.328 5.5-3.5c0-1 .53-8.147-3-10.5-1.5-1-4-1.5-4-1.5l-1 2h-2" stroke="currentColor" stroke-linejoin="round"></path>
        <path d="M8.528 17.5l-1 2s-4.171-1.328-5.5-3.5c0-1-.53-8.147 3-10.5 1.5-1 4-1.5 4-1.5l1 2h2" stroke="currentColor" stroke-linejoin="round"></path>
        <path d="M8.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zM15.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z" stroke="currentColor" stroke-linejoin="round"></path>
        </svg>
      </LinkIcon>

      {/* Twitter 图标链接 */}
      <LinkIcon href="https://twitter.com/arwesjs" target="_blank" title="Go to Twitter">
        <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          {/* Twitter SVG 内容 */}
        <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" stroke-linejoin="round"></path>


        </svg>
      </LinkIcon>

            {account ? (
                <ConnectButton type="button">
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </ConnectButton>
            ) : (
                <ConnectButton type="button" onClick={connectHandler}>
                    Connect
                </ConnectButton>
            )}
            </Actions>
        </Nav>
    );
}

export default Navigation;
