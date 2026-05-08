# Team Setup Guide: Healthcare Blockchain

Welcome to the project! To ensure everyone on the team is reading and writing to the **exact same database** on the blockchain, please follow these steps carefully.

## Prerequisites
1. Clone the project repository to your computer.
2. Open the project in your terminal and run `npm install` to install all dependencies.
3. Install the **MetaMask** browser extension.

## Step 1: Configure Your Environment Variables
You need to set up your `.env` file so your code knows where to talk to the blockchain.

1. In the root of the `healthcare-blockchain` folder, create a file named `.env` (if it doesn't exist).
2. Copy the text below and paste it into your `.env` file:

```env
# 1. Shared Alchemy RPC URL for Sepolia (DO NOT CHANGE)
ALCHEMY_API_URL="https://eth-sepolia.g.alchemy.com/v2/ckmcxgMOlxJpXM_NJA0So"

# 2. Your MetaMask Private Key 
PRIVATE_KEY="YOUR_CHOSEN_PRIVATE_KEY_HERE"

# 3. Deployed Contract Address (DO NOT CHANGE)
CONTRACT_ADDRESS="0x7cB232fb054E768F5A78601C0F2Fa5DdcacFa304"
```

## Step 2: Choose Your Wallet Strategy (The Private Key)
For this project, you have two options for your `PRIVATE_KEY`. Choose the one your team agreed upon:

### Option A: Use the Communal Team Wallet (Easiest)
We have a shared "Team Wallet" that already has fake Sepolia ETH loaded into it to pay for transaction fees.
1. Ask the team lead for the shared private key.
2. Paste it into your `.env` file for `PRIVATE_KEY`.
3. *You do not need to do anything else! You are ready to go.*

### Option B: Use Your Own Personal Wallet (Most Authentic)
You can use your own MetaMask wallet so that your transactions are tied to your specific address.
1. Open your own MetaMask, click **Account Details**, and click **Show Private Key**.
2. Paste your personal private key into your `.env` file for `PRIVATE_KEY`.
3. **IMPORTANT:** Because you are using your own wallet, you must fund it to pay for gas fees! Go to the [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia), log in with Google, paste your public wallet address (`0x...`), and receive your free 0.05 Sepolia ETH.

> [!WARNING]
> NEVER share or use a private key that contains real money! Always use a dedicated testnet account.

## Step 3: Run the Project
Run the following commands in your terminal to sync up with the blockchain and start the backend server:

```bash
# 1. Compile the smart contract locally
npx hardhat compile

# 2. Test the connection (Optional, reads patient data)
npx hardhat run scripts/fetch.js --network sepolia

# 3. Start the backend API server
cd backend
npm install
node server.js
```

You are now fully synced with the team!
