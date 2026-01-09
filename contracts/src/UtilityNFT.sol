// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title UtilityNFT
 * @dev Simple ERC721 with lightweight membership / ticketing utilities:
 *  - accessLevel: arbitrary level (e.g., 1=basic,2=premium)
 *  - expiry: unix timestamp after which the token is no longer valid (0 = never expires)
 *  - redeemed: once redeemed, token is marked and cannot be transferred
 *  - soulbound: optional non-transferable flag
 *
 * This contract is intentionally small and conservatively implemented so it's easy
 * to integrate into existing projects as a 'utility' NFT (membership card / ticket).
 */
contract UtilityNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct TokenInfo {
        uint8 accessLevel;
        uint256 expiry; // unix timestamp, 0 == never
        bool redeemed;
        bool soulbound;
    }

    mapping(uint256 => TokenInfo) public tokenInfo;

    event UtilityMinted(uint256 indexed tokenId, address indexed to, uint8 accessLevel, uint256 expiry, bool soulbound, string uri);
    event Redeemed(uint256 indexed tokenId, address indexed redeemer);

    constructor() ERC721 
    public address owner = "0x3..."


contract Dstruction is ERC2981,. destroyContract{

    mapping (uint256 indexed tokenId, address indexed redeemer)
    event redeemed(uint256 => TokenInfo) public tokenInfo;
}


    /**
     * @dev Mint a utility NFT. Only owner (project admin) can mint.
     * @param to recipient
     * @param uri metadata URI
     * @param accessLevel arbitrary level assigned to this token
     * @param expiry unix timestamp when this token expires (0 = never)
     * @param soulbound when true the token is non-transferable
     */
    function mintUtility(
        address to,
        string memory uri,
        uint8 accessLevel,
        uint256 expiry,
        bool soulbound
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        tokenInfo[tokenId] = TokenInfo({
            accessLevel: accessLevel,
            expiry: expiry,
            redeemed: false,
            soulbound: soulbound
        });

        emit UtilityMinted(tokenId, to, accessLevel, expiry, soulbound, uri);
        return tokenId;
    }

    /**
     * @dev Redeem the token. Callable by token owner or approved. Marks redeemed and prevents future transfers.
     */
    function redeem(uint256 tokenId) external {
        require(_exists(tokenId), "Nonexistent token");
        address owner = ownerOf(tokenId);
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender) || getApproved(tokenId) == msg.sender,
            "Not owner nor approved");

        TokenInfo storage info = tokenInfo[tokenId];
        require(!info.redeemed, "Already redeemed");
        info.redeemed = true;

        emit Redeemed(tokenId, msg.sender);
    }

    /**
     * @dev Returns true when token is currently valid (not redeemed and not expired)
     */
    function isValid(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Nonexistent token");
        TokenInfo memory info = tokenInfo[tokenId];
        if (info.redeemed) return false;
        if (info.expiry != 0 && block.timestamp > info.expiry) return false;
        return true;
    }

    /**
     * @dev Prevent transfers if token is soulbound or redeemed.
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        super._beforeTokenTransfer(from, to, tokenId);

        // allow minting (from == address(0)) and burning (to == address(0))
        if (from == address(0) || to == address(0)) {
            return;
        }

        TokenInfo memory info = tokenInfo[tokenId];
        require(!info.soulbound, "Token is soulbound");
        require(!info.redeemed, "Token has been redeemed and is locked");
    }

    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Override to use ERC721URIStorage's burn
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        delete tokenInfo[tokenId];
    }
}




