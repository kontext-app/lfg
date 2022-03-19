
const hre = require("hardhat");

async function main() {

  const MSK = await hre.ethers.getContractFactory("MSK");
  const msk = await MSK.deploy();

  await msk.deployed();

  console.log("MSK Contract deployed to:", msk.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
