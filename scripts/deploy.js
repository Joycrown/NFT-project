const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CryptoAvatars = await hre.ethers.getContractFactory("CryptoAvatars");
  const crypto_Avatars = await CryptoAvatars.deploy(deployer.address);

  await crypto_Avatars.deployed();

  console.log("CryptoAvatars deployed to:", crypto_Avatars.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });