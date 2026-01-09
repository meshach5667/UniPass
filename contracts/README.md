# ArtRoyalty Smart Contracts

Smart contracts for the ArtRoyalty NFT marketplace with automated royalty payments on Lisk L2.

## Contracts

### ArtRoyaltyNFT.sol
- **ERC-721** compliant NFT contract
- **ERC-2981** royalty standard implementation
- Allows minting NFTs with customizable royalty percentages (0-25%)
- Tracks original creators for royalty distribution
- Integrated with marketplace for seamless trading

### ArtRoyaltyMarketplace.sol
- Decentralized marketplace for listing and buying NFTs
- Automatic royalty distribution on secondary sales
- Platform fee collection (default 2.5%, max 10%)
- Secure payment handling with reentrancy protection
- Support for any ERC-721 NFT with ERC-2981 royalties

## Features

✅ **Automated Royalties**: Artists automatically receive royalties on every resale
✅ **Low Gas Fees**: Optimized for Lisk L2 network
✅ **Secure**: Built with OpenZeppelin libraries and reentrancy guards
✅ **Flexible**: Support for custom royalty percentages per NFT
✅ **Standards Compliant**: ERC-721 and ERC-2981 compatible

## Setup

### Prerequisites
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- A wallet with Lisk Sepolia testnet ETH

### Installation

```shell
# Install dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test
```

## Deployment

### 1. Setup Environment Variables

```shell
# Copy the example env file
cp .env.example .env

# Edit .env and add your private key
# PRIVATE_KEY=your_private_key_here
```

### 2. Get Testnet Tokens

Get Lisk Sepolia testnet ETH from:
- [Lisk Sepolia Faucet](https://sepolia-faucet.lisk.com/)

### 3. Deploy to Lisk Sepolia Testnet

```shell
forge script script/DeployArtRoyalty.s.sol:DeployArtRoyalty \
  --rpc-url lisk_sepolia \
  --broadcast \
  --verify
```

### 4. Save Contract Addresses

After deployment, save the contract addresses to use in the frontend:
- `ArtRoyaltyNFT` contract address
- `ArtRoyaltyMarketplace` contract address

## Contract Interactions

### Minting an NFT

```solidity
// Approve the minting transaction
nft.mintNFT(
    artistAddress,      // Address to mint to
    "ipfs://...",      // Metadata URI
    1000               // Royalty fee (10% = 1000 basis points)
)
```

### Listing an NFT for Sale

```solidity
// First, approve marketplace to handle your NFT
nft.setApprovalForAll(marketplaceAddress, true);

// List NFT
marketplace.listNFT(
    nftContractAddress,
    tokenId,
    ethers.utils.parseEther("0.5") // Price in ETH
)
```

### Buying an NFT

```solidity
marketplace.buyNFT{value: price}(
    nftContractAddress,
    tokenId
)
```

## Testing

```shell
# Run all tests
forge test

# Run tests with gas reporting
forge test --gas-report

# Run tests with verbosity
forge test -vvv
```

## Verification

To verify contracts on Blockscout:

```shell
forge verify-contract \
  --chain-id 4202 \
  --verifier blockscout \
  --verifier-url https://sepolia-blockscout.lisk.com/api \
  <CONTRACT_ADDRESS> \
  src/ArtRoyaltyNFT.sol:ArtRoyaltyNFT
```

## Network Information

**Lisk Sepolia Testnet**
- Chain ID: 4202
- RPC URL: https://rpc.sepolia-api.lisk.com
- Block Explorer: https://sepolia-blockscout.lisk.com
- Faucet: https://sepolia-faucet.lisk.com

## Security Considerations

- Contracts use OpenZeppelin's battle-tested implementations
- ReentrancyGuard protects against reentrancy attacks
- Proper access control with Ownable pattern
- Royalty fees capped at 25% maximum
- Platform fees capped at 10% maximum

## License

MIT License
