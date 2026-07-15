import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers"; 

const PRIVATE_KEY = "";

export default defineConfig({
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://ankr.com", 
      accounts: [PRIVATE_KEY]
      
    },
  },
});


