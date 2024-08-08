const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

const { CONTRACT_ADDRESS, RECIPIENT_ADDRESS} = process.env;

async function main() {
  const CryptoAvatars = await hre.ethers.getContractFactory("CryptoAvatars");
  const [owner] = await hre.ethers.getSigners();

  const contractAddress = CONTRACT_ADDRESS;
  const crypto_Avatars = CryptoAvatars.attach(contractAddress);

  console.log("Minting NFT...");

  const recipientAddress = RECIPIENT_ADDRESS;

  // Read local JSON file
  const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, '../metadata/ethereum.json'), 'utf8'));

  // In a real scenario, you'd upload this metadata to IPFS or a server
  // For testing, we'll use a dummy URI
  const tokenURI = "dummy://local-testing-uri";

  // Mint the NFT
  const tx = await crypto_Avatars.mintNFT(recipientAddress, tokenURI);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();

  console.log("NFT minted successfully!");
  console.log("Transaction hash:", tx.hash);
  console.log("Metadata:", metadata);

  // Get the minted token ID from the event logs
  const event = receipt.events?.find(event => event.event === 'Transfer');
  const tokenId = event?.args?.tokenId;

  if (tokenId) {
    console.log("Minted token ID:", tokenId.toString());
  } else {
    console.log("Could not retrieve token ID from event logs");
  }

  const nftDetails = await crypto_Avatars.tokenURI(5)
  console.log("TokenURI of the created NFT:", nftDetails, "And transferred successfully to the address:", recipientAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });