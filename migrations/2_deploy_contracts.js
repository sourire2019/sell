var Coin = artifacts.require("./Coin.sol");
var Sell = artifacts.require("./Sell.sol");
module.exports = function(deployer) {
	deployer.deploy(Coin);
	deployer.deploy(Sell);
};
