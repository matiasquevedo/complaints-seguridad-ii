

const Complaints = artifacts.require("Complaints");


module.exports = function(deployer) {

  deployer.deploy(Complaints);

};