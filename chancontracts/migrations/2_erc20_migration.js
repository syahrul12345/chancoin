const erc20 = artifacts.require("erc20");

module.exports = function(deployer) {
  deployer.deploy(erc20,"chancoin.cash","CHAN","100000000000000000000000","0x08EF50EF4D59830Fe6EAC3aB716f104f410e1d5f");
};
