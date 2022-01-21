const APKTEST = artifacts.require("./contracts/APKTEST.sol");

module.exports = function (deployer) {
  deployer.deploy(APKTEST, 1000000);
};
