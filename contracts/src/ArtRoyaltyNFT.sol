// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ArtRoyaltyNFT
 * @dev ERC721 NFT with ERC2981 royalty standard for automated royalty payments
 */
contract ArtRoyaltyNFT is ERC721, ERC721URIStorage, ERC2981, Ownable {
    uint256 private _tokenIdCounter;

    // Mapping from token ID to creator address
    mapping(uint256 => address) private _tokenCreators;
    
    // Marketplace address for listing management
    address public marketplace;
    
    event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI, uint96 royaltyFee);
    event MarketplaceUpdated(address indexed newMarketplace);

    constructor() ERC721("ArtRoyalty NFT", "ART") Ownable(msg.sender) {}

    /**
     * @dev Mints a new NFT with royalty information
     * @param to Address to mint the NFT to
     * @param uri Metadata URI for the NFT
     * @param royaltyFeeBps Royalty fee in basis points (e.g., 1000 = 10%)
     */
    function mintNFT(
        address to,
        string memory uri,
        uint96 royaltyFeeBps
    ) public returns (uint256) {
        require(royaltyFeeBps <= 2500, "Royalty fee too high (max 25%)");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        // Set royalty info - creator receives royalty on secondary sales
        _setTokenRoyalty(tokenId, to, royaltyFeeBps);
        
        // Store the original creator
        _tokenCreators[tokenId] = to;
        
        emit NFTMinted(tokenId, to, uri, royaltyFeeBps);
        
        return tokenId;
    }

    /**
     * @dev Returns the creator of a token
     */
    function getTokenCreator(uint256 tokenId) public view returns (address) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenCreators[tokenId];
    }

    /**
     * @dev Updates the marketplace address
     */
    function setMarketplace(address _marketplace) external onlyOwner {
        marketplace = _marketplace;
        emit MarketplaceUpdated(_marketplace);
    }

    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
