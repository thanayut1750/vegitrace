// Force Truffle to run migration
const VegetableTraceability = artifacts.require("VegetableTraceability");

module.exports = async function (deployer) {
  const account = "0xD3fE8Ed4a24E165633ee7F08D7f3dDC5A52652c8";
  await deployer.deploy(VegetableTraceability, account);

  const deployedContract = await VegetableTraceability.deployed();
  console.log("Contract deployed at address:", deployedContract.address);
};
