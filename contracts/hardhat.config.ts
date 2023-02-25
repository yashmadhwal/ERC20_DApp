require("@nomiclabs/hardhat-waffle");
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "hardhat-deploy";


import {HardhatUserConfig} from "hardhat/config"


const secrets = require("./.secrets.json");

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.13",
      },
    ],
  },
  networks: {
    hardhat: {
      // forking: {
      //   url: "https://speedy-nodes-nyc.moralis.io/a21c320a08cac4d00423de90/bsc/testnet",
      // },
      chainId: 31337
    },
    localhost:{
      chainId: 31337
    },
    bsc_testnet: {
      url: "https://speedy-nodes-nyc.moralis.io/a21c320a08cac4d00423de90/bsc/testnet",
      accounts: [secrets.privateKey],
      verify: {
        etherscan: {
          apiKey: secrets.apiKey,
        },
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: secrets.apiKey,
  },
  namedAccounts: {
    deployer: 0,
    sender: 1,
  },
};

export default config;

