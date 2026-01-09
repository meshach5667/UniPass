# ArtRoyalty - NFT Marketplace with Automated Royalties

A decentralized NFT marketplace built on Lisk L2 with ERC-2981 compliant smart contracts for automated royalty payments to artists on every secondary sale.

![Lisk L2](https://img.shields.io/badge/Lisk-L2-purple)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6)

## 🌟 Features

### For Artists (Creators)
- ✅ **Mint NFTs** with custom royalty percentages (0-25%)
- ✅ **Automatic Royalty Payments** on every resale via ERC-2981 standard
- ✅ **Dashboard** to track owned NFTs and royalty earnings
- ✅ **IPFS Storage** for permanent, decentralized asset storage

### For Collectors (Users)
- ✅ **Browse Marketplace** with search and filter functionality
- ✅ **Buy & Sell NFTs** with MetaMask wallet integration
- ✅ **View NFT Details** including ownership history and royalty info
- ✅ **Low Gas Fees** on Lisk L2 network

### Technical Features
- ✅ **ERC-721** compliant NFT standard
- ✅ **ERC-2981** royalty standard for automated payments
- ✅ **Decentralized** - Built on blockchain with IPFS storage
- ✅ **Secure** - Audited OpenZeppelin contracts with reentrancy protection
- ✅ **Responsive** - Modern UI with Tailwind CSS and shadcn/ui

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Web3**: wagmi + viem for blockchain interactions
- **State Management**: React Context + TanStack Query
- **Routing**: React Router v6

### Smart Contracts
- **Language**: Solidity 0.8.20
- **Framework**: Foundry
- **Network**: Lisk Sepolia Testnet (Chain ID: 4202)
- **Standards**: ERC-721, ERC-2981, OpenZeppelin

### Storage
- **NFT Assets**: IPFS (InterPlanetary File System)
- **Metadata**: IPFS with Pinata pinning service

## 📋 Prerequisites

- Node.js >= 20.19.0
- npm or bun package manager
- [Foundry](https://book.getfoundry.sh/getting-started/installation) for smart contracts
- MetaMask or compatible Web3 wallet
- Lisk Sepolia testnet ETH

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd artroyalty
```

### 2. Setup Smart Contracts

```bash
cd contracts

# Install dependencies
forge install

# Setup environment variables
cp .env.example .env
# Edit .env and add your private key

# Compile contracts
forge build

# Deploy to Lisk Sepolia Testnet
forge script script/DeployArtRoyalty.s.sol:DeployArtRoyalty \
  --rpc-url lisk_sepolia \
  --broadcast
```

**Save the deployed contract addresses!**

### 3. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your contract addresses to .env:
# VITE_NFT_CONTRACT_ADDRESS=<your-nft-contract-address>
# VITE_MARKETPLACE_CONTRACT_ADDRESS=<your-marketplace-contract-address>

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Usage Guide

### For Artists

#### 1. Connect Wallet
- Click "Connect Wallet" in the navigation
- Select MetaMask and approve the connection
- Ensure you're on Lisk Sepolia testnet

#### 2. Mint Your NFT
- Navigate to "Mint NFT" page
- Upload your artwork (PNG, JPG, GIF, WebP - max 10MB)
- Enter title and description
- Set royalty percentage (0-25%)
- Confirm transaction in MetaMask
- Wait for transaction confirmation

#### 3. List for Sale
- Go to your Dashboard
- Select an NFT you own
- Click "List for Sale"
- Set your price
- Approve marketplace to handle your NFT
- Confirm listing transaction

### For Collectors

#### 1. Browse Marketplace
- Visit the Marketplace page
- Use search and filters to find NFTs
- Click on any NFT to view details

#### 2. Purchase an NFT
- On the NFT detail page, click "Buy Now"
- Confirm the transaction in MetaMask
- Wait for confirmation
- NFT will appear in your Dashboard

#### 3. Resell NFTs
- Any NFT you purchase can be relisted
- Original artist automatically receives royalties on your sale!

## 🔧 Configuration

### Lisk Sepolia Testnet

- **Chain ID**: 4202
- **RPC URL**: https://rpc.sepolia-api.lisk.com
- **Block Explorer**: https://sepolia-blockscout.lisk.com
- **Faucet**: https://sepolia-faucet.lisk.com

### Adding Lisk Sepolia to MetaMask

1. Open MetaMask
2. Click Network dropdown
3. Select "Add Network"
4. Enter the following:
   - Network Name: Lisk Sepolia Testnet
   - RPC URL: https://rpc.sepolia-api.lisk.com
   - Chain ID: 4202
   - Currency Symbol: ETH
   - Block Explorer: https://sepolia-blockscout.lisk.com

## 📂 Project Structure

```
artroyalty/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── config/        # Web3 & contract configuration
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── pages/         # Page components
│   ├── public/            # Static assets
│   └── package.json
│
├── contracts/             # Smart contracts
│   ├── src/              # Solidity contracts
│   │   ├── ArtRoyaltyNFT.sol
│   │   └── ArtRoyaltyMarketplace.sol
│   ├── script/           # Deployment scripts
│   ├── test/             # Contract tests
│   └── foundry.toml      # Foundry configuration
│
└── README.md
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd contracts

# Run all tests
forge test

# Run with gas reporting
forge test --gas-report

# Run with detailed output
forge test -vvv
```

### Frontend Tests

```bash
cd client
npm run test
```

## 📝 Smart Contract Functions

### ArtRoyaltyNFT

- `mintNFT(address to, string uri, uint96 royaltyFeeBps)` - Mint new NFT with royalty
- `getTokenCreator(uint256 tokenId)` - Get original creator address
- `royaltyInfo(uint256 tokenId, uint256 salePrice)` - Get royalty information (ERC-2981)

### ArtRoyaltyMarketplace

- `listNFT(address nftContract, uint256 tokenId, uint256 price)` - List NFT for sale
- `buyNFT(address nftContract, uint256 tokenId)` - Purchase listed NFT
- `cancelListing(address nftContract, uint256 tokenId)` - Cancel listing
- `getListing(address nftContract, uint256 tokenId)` - Get listing details

## 🔐 Security

- Built with OpenZeppelin's audited contract libraries
- ReentrancyGuard protection against reentrancy attacks
- Proper access control with Ownable pattern
- Royalty fees capped at 25% maximum
- Platform fees capped at 10% maximum
- No backend required - fully decentralized

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Open an issue on GitHub
- Check the documentation
- Visit Lisk Discord

## 🔮 Future Enhancements

- [ ] Add auction functionality
- [ ] Support for ERC-1155 multi-edition NFTs
- [ ] Collection creation and management
- [ ] Advanced analytics dashboard
- [ ] Social features (follow artists, likes, comments)
- [ ] Multiple chain support
- [ ] Mobile app version

## 🙏 Acknowledgments

- [Lisk](https://lisk.com/) - L2 blockchain platform
- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contract libraries
- [Foundry](https://getfoundry.sh/) - Ethereum development toolkit
- [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components

---

Built with ❤️ for the decentralized future of digital art.
