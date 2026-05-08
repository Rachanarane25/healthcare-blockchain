const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    console.error("Please set CONTRACT_ADDRESS in your .env file!");
    process.exit(1);
  }

  console.log(`Connecting to contract at: ${contractAddress}`);

  // Get the contract factory and attach to the deployed address
  const TreatmentLogger = await hre.ethers.getContractFactory("TreatmentLogger");
  const contract = await TreatmentLogger.attach(contractAddress);

  console.log("\n1. Adding a new treatment...");
  // Function signature: addTreatment(string _patientId, string _service, uint _cost)
  const tx = await contract.addTreatment("PATIENT_001", "Routine Checkup", 150);
  
  console.log(`Transaction submitted! Hash: ${tx.hash}`);
  console.log("Waiting for transaction to be mined (this usually takes 10-20 seconds)...");
  
  // Wait for the transaction to be mined
  await tx.wait();
  console.log("✅ Transaction confirmed!\n");

  console.log("2. Fetching all treatments from the blockchain...");
  const treatments = await contract.getAllTreatments();
  
  console.log("\n--- Treatment Log ---");
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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
