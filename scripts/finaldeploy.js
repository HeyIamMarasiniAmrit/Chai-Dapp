import { network } from "hardhat";

async function main() {
  
  const chai = await ethers.getContractFactory("Chai");
  const contract = await chai.deploy();

  await contract.waitForDeployment();
  console.log("Address of contract:", contractAddress);
}
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });