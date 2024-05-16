import { ethers } from "hardhat";

async function main() {
  const MarketPlace = await ethers.getContractFactory("Ecommarce");
  const marketPlace = await MarketPlace.deploy();

  await marketPlace.deployed();

  console.log(`MarketPlace deployed to ${marketPlace.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});