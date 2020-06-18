const erc20 = artifacts.require("erc20");

module.exports = function(deployer) {
  deployer.deploy(erc20,"testcoin.com","TEST","100000000000000000000000","0x2De9314C80bB6D2836c4C3F11e94a21699924b3B");
};
