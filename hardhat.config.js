require("@nomicfoundation/hardhat-toolbox");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.REACT_APP_SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygonMumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 8000000000, // 8 Gwei
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL, // Polygon Mainnet RPC URL
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      sepolia: process.env.REACT_APP_ETHERSCAN_KEY,
    },
  },
};
