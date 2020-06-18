var HDWalletProvider = require("truffle-hdwallet-provider");
const { mnemonic, rpc, testrpc,infura } = require('./password.js')
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic,infura)
      },
      network_id:'*',
      gasPrice:30000000000,
      gas:1500000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic,testrpc)
      },
      network_id:'3',
      gasPrice:5000000000,
      gas:2500000
    }
    
  },

  compilers: {
    solc: {
      version: "0.6.2",
      optimizer: {
            enabled: true,
            runs: 200
        }  
    }
  }
}
