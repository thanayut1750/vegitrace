

const HDWalletProvider = require("@truffle/hdwallet-provider");
const providerTestnet = new HDWalletProvider({
  privateKeys: [
    "7f5c9f34f0e41dee5f28c8b5ee5370e2d5d503848a9ddb3383685f824fb3354b",
  ],
  providerOrUrl: "https://rpc-mumbai.maticvigil.com",
});

module.exports = {

  contracts_diretory: "./contract/",
  contracts_build_directory: "./src/abis/",
  networks: {

    mumbai: {
      provider: () => providerTestnet,
      network_id: "80001",
      port: 80001,
      skipDryRun: true,
    },

  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.14", 
    },
  },


};
