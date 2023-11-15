import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import 'hardhat-storage-layout';
import "hardhat-gas-reporter";
import "solidity-coverage";
import 'hardhat-deploy';
require('./tasks');

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.9", settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: "0.8.0", settings: { optimizer: { enabled: true, runs: 200 } } },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    map: {
      chainId: 22776,
      url: "https://rpc.maplabs.io",
      accounts: process.env.MAINNET_PRIVATE_KEY !== undefined ? [process.env.MAINNET_PRIVATE_KEY] : [],
    },
    polygon: {
      chainId: 137,
      url: "https://rpc-mainnet.matic.quiknode.pro",
      accounts: [process.env.MAINNET_PRIVATE_KEY || ''],
    },

  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygon: "NMW25E1J3FB2TN4SYWN19UXC5FN8T4K7IG"
    },
    customChains: [
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://api.polygonscan.com"
        }
      }
    ]
  }
};

export default config;




