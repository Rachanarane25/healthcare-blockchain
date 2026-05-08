const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("Please set CONTRACT_ADDRESS in your .env file!");
    process.exit(1);
  }

  console.log(`Connecting to contract at: ${contractAddress}\n`);

  // Get the contract instance
  const TreatmentLogger = await hre.ethers.getContractFactory("TreatmentLogger");
  const contract = await TreatmentLogger.attach(contractAddress);

  console.log("Fetching all treatments from the blockchain...");
  
  // Fetch data (this is free and fast, doesn't require a transaction)
  const treatments = await contract.getAllTreatments();
  
  console.log("\n--- Treatment Log ---");
  if (treatments.length === 0) {
    console.log("No treatments found.");
  } else {
    treatments.forEach((t) => {
      console.log(`ID: ${t.id}`);
      console.log(`Patient ID: ${t.patientId}`);
      console.log(`Service: ${t.service}`);
      console.log(`Cost: $${t.cost}`);
      // Convert Unix timestamp to readable date
      const date = new Date(t.timestamp * 1000).toLocaleString();
      console.log(`Date: ${date}`);
      console.log("-------------------");
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
