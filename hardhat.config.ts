import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002
    },
     goerli: {
     url: "https://linea-goerli.infura.io/v3/7f7d4dc8d3824e599d",
     accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
     },
}};

export default config;