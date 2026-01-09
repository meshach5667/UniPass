// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * @title MembershipToken (Premium Utility NFT)
 * @dev Enhanced membership/ticket token with:
 *  - Tier-based access levels
 *  - Expiration with auto-invalidation
 *  - Soulbound (non-transferable by default)
 *  - Batch minting for B2B
 *  - Usage tracking & redemption
 *  - Renewal capabilities
 *
 * Real-world use cases:
 * - Concert/Event Tickets
 * - Gym/Fitness Memberships
 * - SaaS Subscriptions
 * - Corporate Access Cards
 * - Community Passes
 *
 * This is production-ready for enterprise integrations.
 */
contract MembershipToken is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    // ============ DATA STRUCTURES ============
    
    struct Membership {
        uint8 tier;                    // 1=Basic, 2=Premium, 3=VIP (extensible)
        uint256 expiresAt;             // unix timestamp
        bool soulbound;                // if true, not transferable
        uint32 usageCount;             // track redemptions
        uint32 maxUsages;              // 0 = unlimited
        bytes32 organizationId;        // which org owns this membership
        bool isActive;                 // can be revoked by issuer
    }

    // ============ STATE ============
    
    uint256 private _tokenIdCounter;
    
    mapping(uint256 => Membership) public memberships;
    mapping(bytes32 => address) public organizationIssuers;  // org -> authorized issuer
    mapping(address => bytes32) public issuerToOrganization; // issuer -> org
    mapping(bytes32 => uint256) public organizationMemberCount; // org -> total minted
    
    // ============ EVENTS ============
    
    event MembershipMinted(
        uint256 indexed tokenId,
        address indexed holder,
        bytes32 indexed organizationId,
        uint8 tier,
        uint256 expiresAt
    );
    
    event MembershipRenewed(
        uint256 indexed tokenId,
        uint256 newExpiryDate
    );
    
    event MembershipRedeemed(
        uint256 indexed tokenId,
        address indexed redeemer,
        uint32 newUsageCount
    );
    
    event MembershipRevoked(
        uint256 indexed tokenId,
        string reason
    );
    
    event OrganizationRegistered(
        bytes32 indexed organizationId,
        address indexed issuer,
        string organizationName
    );
    
    event TierLimitUpdated(
        bytes32 indexed organizationId,
        uint8 tier,
        uint32 maxUsages
    );

    // ============ MODIFIERS ============
    
    modifier onlyValidIssuer(bytes32 organizationId) {
        require(
            organizationIssuers[organizationId] == msg.sender || owner() == msg.sender,
            "Not authorized issuer for organization"
        );
        _;
    }
    
    modifier tokenExists(uint256 tokenId) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        _;
    }
    
    modifier tokenActive(uint256 tokenId) {
        require(memberships[tokenId].isActive, "Membership revoked");
        require(isValidMembership(tokenId), "Membership expired");
        _;
    }

    // ============ CONSTRUCTOR ============
    
    constructor() ERC721("UniPass Membership", "PASS") Ownable(msg.sender) {}

    // ============ ORGANIZATION MANAGEMENT ============
    
    /**
     * @dev Register a new organization as an issuer
     * Only contract owner can register organizations
     */
    function registerOrganization(
        bytes32 organizationId,
        address issuer,
        string calldata organizationName
    ) external onlyOwner {
        require(issuer != address(0), "Invalid issuer address");
        require(organizationIssuers[organizationId] == address(0), "Organization already registered");
        
        organizationIssuers[organizationId] = issuer;
        issuerToOrganization[issuer] = organizationId;
        
        emit OrganizationRegistered(organizationId, issuer, organizationName);
    }
    
    /**
     * @dev Update organization issuer (for key rotation)
     */
    function updateOrganizationIssuer(
        bytes32 organizationId,
        address newIssuer
    ) external onlyOwner {
        require(newIssuer != address(0), "Invalid issuer");
        organizationIssuers[organizationId] = newIssuer;
        issuerToOrganization[newIssuer] = organizationId;
    }

    // ============ MINTING ============
    
    /**
     * @dev Mint a membership token
     * @param holder Address receiving the membership
     * @param organizationId Organization identifier
     * @param tier Membership tier (1-255)
     * @param durationDays Number of days until expiration (0 = non-expiring)
     * @param maxUsages Max times this can be redeemed (0 = unlimited)
     * @param soulbound If true, non-transferable
     * @param metadataURI URI pointing to membership metadata
     */
    function mintMembership(
        address holder,
        bytes32 organizationId,
        uint8 tier,
        uint32 durationDays,
        uint32 maxUsages,
        bool soulbound,
        string calldata metadataURI
    ) external onlyValidIssuer(organizationId) returns (uint256) {
        require(holder != address(0), "Invalid holder");
        require(tier > 0, "Tier must be > 0");
        
        uint256 tokenId = _tokenIdCounter++;
        
        uint256 expiresAt = durationDays > 0 
            ? block.timestamp + (uint256(durationDays) * 1 days)
            : 0;
        
        memberships[tokenId] = Membership({
            tier: tier,
            expiresAt: expiresAt,
            soulbound: soulbound,
            usageCount: 0,
            maxUsages: maxUsages,
            organizationId: organizationId,
            isActive: true
        });
        
        organizationMemberCount[organizationId]++;
        
        _safeMint(holder, tokenId);
        _setTokenURI(tokenId, metadataURI);
        
        emit MembershipMinted(tokenId, holder, organizationId, tier, expiresAt);
        
        return tokenId;
    }
    
    /**
     * @dev Batch mint memberships (for bulk ticket/membership sales)
     * Gas optimized for large-scale operations
     */
    function batchMintMemberships(
        address[] calldata holders,
        bytes32 organizationId,
        uint8 tier,
        uint32 durationDays,
        uint32 maxUsages,
        bool soulbound,
        string calldata metadataURIBase
    ) external onlyValidIssuer(organizationId) returns (uint256[] memory) {
        require(holders.length > 0 && holders.length <= 100, "Invalid batch size");
        
        uint256[] memory tokenIds = new uint256[](holders.length);
        uint256 expiresAt = durationDays > 0 
            ? block.timestamp + (uint256(durationDays) * 1 days)
            : 0;
        
        for (uint256 i = 0; i < holders.length; i++) {
            require(holders[i] != address(0), "Invalid holder");
            
            uint256 tokenId = _tokenIdCounter++;
            
            memberships[tokenId] = Membership({
                tier: tier,
                expiresAt: expiresAt,
                soulbound: soulbound,
                usageCount: 0,
                maxUsages: maxUsages,
                organizationId: organizationId,
                isActive: true
            });
            
            _safeMint(holders[i], tokenId);
            _setTokenURI(tokenId, metadataURIBase);
            
            tokenIds[i] = tokenId;
        }
        
        organizationMemberCount[organizationId] += holders.length;
        
        return tokenIds;
    }

    // ============ MEMBERSHIP LIFECYCLE ============
    
    /**
     * @dev Redeem a membership (e.g., entry to event, gym check-in)
     * Verifiable on-chain proof of usage
     */
    function redeemMembership(uint256 tokenId) 
        external 
        tokenExists(tokenId)
        tokenActive(tokenId)
        returns (bool)
    {
        require(msg.sender == ownerOf(tokenId), "Only token holder can redeem");
        
        Membership storage mem = memberships[tokenId];
        
        if (mem.maxUsages > 0) {
            require(mem.usageCount < mem.maxUsages, "Usage limit reached");
            mem.usageCount++;
        } else {
            mem.usageCount++;
        }
        
        emit MembershipRedeemed(tokenId, msg.sender, mem.usageCount);
        return true;
    }
    
    /**
     * @dev Verify membership validity (for off-chain verification)
     * Perfect for API endpoints and gating logic
     */
    function isValidMembership(uint256 tokenId) public view returns (bool) {
        if (!_ownerOf(tokenId) != address(0)) return false;
        
        Membership memory mem = memberships[tokenId];
        
        // Check if active
        if (!mem.isActive) return false;
        
        // Check if expired
        if (mem.expiresAt > 0 && block.timestamp > mem.expiresAt) return false;
        
        // Check usage limits
        if (mem.maxUsages > 0 && mem.usageCount >= mem.maxUsages) return false;
        
        return true;
    }
    
    /**
     * @dev Get membership details
     */
    function getMembershipDetails(uint256 tokenId) 
        external 
        view 
        tokenExists(tokenId)
        returns (Membership memory)
    {
        return memberships[tokenId];
    }
    
    /**
     * @dev Renew a membership by extending expiration
     */
    function renewMembership(uint256 tokenId, uint32 additionalDays)
        external
        onlyValidIssuer(memberships[tokenId].organizationId)
        tokenExists(tokenId)
    {
        Membership storage mem = memberships[tokenId];
        require(mem.expiresAt > 0, "Non-expiring membership");
        
        mem.expiresAt += (uint256(additionalDays) * 1 days);
        
        emit MembershipRenewed(tokenId, mem.expiresAt);
    }
    
    /**
     * @dev Revoke a membership (refunded tickets, canceled membership)
     */
    function revokeMembership(uint256 tokenId, string calldata reason)
        external
        onlyValidIssuer(memberships[tokenId].organizationId)
        tokenExists(tokenId)
    {
        memberships[tokenId].isActive = false;
        emit MembershipRevoked(tokenId, reason);
    }

    // ============ TRANSFER RESTRICTIONS ============
    
    /**
     * @dev Override to enforce soulbound restrictions
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        if (_ownerOf(tokenId) != address(0)) {
            require(!memberships[tokenId].soulbound, "Soulbound token cannot be transferred");
        }
        return super._update(to, tokenId, auth);
    }

    // ============ METADATA ============
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // ============ METADATA UPDATES ============
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override(ERC721URIStorage) {
        super._setTokenURI(tokenId, _tokenURI);
    }
}
