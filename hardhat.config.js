require('@nomiclabs/hardhat-truffle5');
require('dotenv').config();
require('hardhat-abi-exporter');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
abiExporter: {
  path: './data/abi',
  clear: true,
  flat: true,
  spacing: 2
},
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545/',
      saveDeployments: true,
    },
    //goerli: {
    //  url: "https://eth-goerli.alchemyapi.io/v2/" + process.env.ALCHEMY_API_KEY,
    //  accounts: [process.env.ALCHEMY_DEPLOYMENT_KEY]
    //}
  },

  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },

  solidity: {
    version: '0.8.0',
    settings: {
      metadata: {
        bytecodeHash: 'none',
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
