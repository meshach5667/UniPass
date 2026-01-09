export const CONTRACTS = {
  // These will be populated after deployment
  NFT_ADDRESS: import.meta.env.VITE_NFT_CONTRACT_ADDRESS || '',
  MARKETPLACE_ADDRESS: import.meta.env.VITE_MARKETPLACE_CONTRACT_ADDRESS || '',
};

export const NFT_ABI = [
  // ERC721 Standard functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address to, uint256 tokenId)",
  "function setApprovalForAll(address operator, bool approved)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  
  // Custom minting function
  "function mintNFT(address to, string memory uri, uint96 royaltyFeeBps) returns (uint256)",
  
  // ERC2981 Royalty functions
  "function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address receiver, uint256 royaltyAmount)",
  
  // Get token creator
  "function getTokenCreator(uint256 tokenId) view returns (address)",
  
  // Events
  "event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI, uint96 royaltyFee)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
] as const;

export const MARKETPLACE_ABI = [
  // Listing functions
  "function listNFT(address nftContract, uint256 tokenId, uint256 price)",
  "function buyNFT(address nftContract, uint256 tokenId) payable",
  "function cancelListing(address nftContract, uint256 tokenId)",
  
  // View functions
  "function getListing(address nftContract, uint256 tokenId) view returns (tuple(address seller, uint256 price, bool active))",
  "function platformFee() view returns (uint256)",
  
  // Events
  "event NFTListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event NFTSold(address indexed nftContract, uint256 indexed tokenId, address indexed seller, address buyer, uint256 price, uint256 royaltyAmount, uint256 platformFeeAmount)",
  "event ListingCancelled(address indexed nftContract, uint256 indexed tokenId, address indexed seller)",
] as const;
