
const hre = require("hardhat");

async function main() {

  const MSK = await hre.ethers.getContractFactory("MSK");
  const msk = await MSK.deploy();
  await msk.deployed();
  console.log("MSK Contract deployed to:", msk.address);
  

  [owner, addr1, addr2, _] = await ethers.getSigners();
  let addy = await msk.address
  console.log("address", addy);
  
  let txn = await msk.mintNFT(1)
  await txn.wait()
  let nftBasicBal = await msk.tokenBalance(owner.address, 1);
  let nftInfluBal = await msk.tokenBalance(owner.address, 2);
  let nftPimpBal = await msk.tokenBalance(owner.address, 3);
  console.log("Basic NFT Balance:", nftBasicBal)
  console.log("Influencer NFT Balance:", nftInfluBal)
  console.log("Pimp NFT Balance:", nftPimpBal)

}






// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
