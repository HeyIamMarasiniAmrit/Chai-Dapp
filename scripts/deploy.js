import { network } from "hardhat";

async function getBalances(ethers, address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

async function consoleBalances(ethers, addresses) {
  let counter = 0;
  for (const address of addresses) {
    const bal = await getBalances(ethers, address);
    console.log(`Address ${counter} (${address}) balance: ${bal} ETH`);
    counter++;
  }
}

async function main() {
  console.log("Initializing Hardhat 3 connection instance...");
  
  // Safe network resolution instance wrapper for Hardhat 3
  const connection = await network.create(); 
  const { ethers } = connection; // Safe destructuring extraction

  if (!ethers) {
    throw new Error("Critical: Ethers compilation instance missing in connection context!");
  }

  // Fetch verified accounts list via signer connection mapping
  const [owner, from1, from2, from3] = await ethers.getSigners();
  
  console.log("Deploying Chai contract to local state...");
  const chai = await ethers.getContractFactory("Chai");
  const contract = await chai.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log("Address of contract:", contractAddress);

  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("\n--- Before buying chai ---");
  await consoleBalances(ethers, addresses);

  const amount = { value: ethers.parseEther("1") };
  
  console.log("\nProcessing coffee crowd-fund purchases...");
  await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
  await contract.connect(from2).buyChai("from2", "Very nice course", amount);
  await contract.connect(from3).buyChai("from3", "Very nice information", amount);

  console.log("\n--- After buying chai ---");
  await consoleBalances(ethers, addresses);

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


