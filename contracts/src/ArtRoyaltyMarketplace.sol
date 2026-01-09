// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/**
 * @title ArtRoyaltyMarketplace
 * @dev Marketplace for buying and selling NFTs with automated royalty payments
 */
contract ArtRoyaltyMarketplace is ReentrancyGuard, Ownable {
    
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    // Mapping from NFT contract => token ID => Listing
    mapping(address => mapping(uint256 => Listing)) public listings;
    
    // Platform fee in basis points (e.g., 250 = 2.5%)
    uint256 public platformFee = 250;
    uint256 public constant MAX_PLATFORM_FEE = 1000; // 10% max
    
    event NFTListed(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    
    event NFTSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 price,
        uint256 royaltyAmount,
        uint256 platformFeeAmount
    );
    
    event ListingCancelled(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller
    );
    
    event PlatformFeeUpdated(uint256 newFee);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev List an NFT for sale
     */
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant {
        require(price > 0, "Price must be greater than 0");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(
            nft.isApprovedForAll(msg.sender, address(this)) ||
            nft.getApproved(tokenId) == address(this),
            "Marketplace not approved"
        );
        
        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            price: price,
            active: true
        });
        
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    /**
     * @dev Buy an NFT that's listed for sale
     */
    function buyNFT(address nftContract, uint256 tokenId)
        external
        payable
        nonReentrant
    {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.active, "NFT not listed for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == listing.seller, "Seller no longer owns NFT");
        
        // Calculate fees
        uint256 royaltyAmount = 0;
        address royaltyReceiver = address(0);
        
        // Check if contract supports ERC2981 royalty standard
        if (IERC165(nftContract).supportsInterface(type(IERC2981).interfaceId)) {
            (royaltyReceiver, royaltyAmount) = IERC2981(nftContract).royaltyInfo(
                tokenId,
                listing.price
            );
        }
        
        uint256 platformFeeAmount = (listing.price * platformFee) / 10000;
        uint256 sellerProceeds = listing.price - royaltyAmount - platformFeeAmount;
        
        // Mark as inactive before transfers to prevent reentrancy
        listings[nftContract][tokenId].active = false;
        
        // Transfer NFT to buyer
        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        
        // Transfer funds
        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            payable(royaltyReceiver).transfer(royaltyAmount);
        }
        
        if (platformFeeAmount > 0) {
            payable(owner()).transfer(platformFeeAmount);
        }
        
        payable(listing.seller).transfer(sellerProceeds);
        
        // Refund excess payment
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
        
        emit NFTSold(
            nftContract,
            tokenId,
            listing.seller,
            msg.sender,
            listing.price,
            royaltyAmount,
            platformFeeAmount
        );
    }

    /**
     * @dev Cancel a listing
     */
    function cancelListing(address nftContract, uint256 tokenId)
        external
        nonReentrant
    {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.active, "NFT not listed");
        require(listing.seller == msg.sender, "Not the seller");
        
        listings[nftContract][tokenId].active = false;
        
        emit ListingCancelled(nftContract, tokenId, msg.sender);
    }

    /**
     * @dev Update platform fee (only owner)
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= MAX_PLATFORM_FEE, "Fee too high");
        platformFee = newFee;
        emit PlatformFeeUpdated(newFee);
    }

    /**
     * @dev Get listing details
     */
    function getListing(address nftContract, uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return listings[nftContract][tokenId];
    }
}
