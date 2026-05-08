require("dotenv").config({ path: "../.env" });
const express = require("express");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());

// Load from .env or fallback to local hardhat
const rpcUrl = process.env.ALCHEMY_API_URL || "http://localhost:8545";
const privateKey = process.env.PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const contractAddress = process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// ABI from artifacts
const abi = require("../artifacts/contracts/TreatmentLogger.sol/TreatmentLogger.json").abi;

const contract = new ethers.Contract(contractAddress, abi, wallet);

// 🔹 add treatment
app.post("/add-treatment", async (req, res) => {
  try {
    const { patientId, service, cost } = req.body;

    const tx = await contract.addTreatment(patientId, service, cost);
    await tx.wait();

    res.send("Treatment added");
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// 🔹 get all treatments
app.get("/treatments", async (req, res) => {
  const data = await contract.getAllTreatments();

  const formatted = data.map(t => ({
    id: t.id.toString(),
    patientId: t.patientId,
    service: t.service,
    cost: t.cost.toString(),
    timestamp: t.timestamp.toString()
  }));

  res.json(formatted);
});
app.get("/bill/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const data = await contract.getAllTreatments();

    let total = 0;
    let breakdown = [];

    data.forEach(t => {
      if (t.patientId === patientId) {
        const cost = parseInt(t.cost.toString());

        total += cost;

        breakdown.push({
          service: t.service,
          cost: cost
        });
      }
    });

    res.json({
      patientId,
      total,
      breakdown
    });

  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});