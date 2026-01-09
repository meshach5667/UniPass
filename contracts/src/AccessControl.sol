// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AccessControl
 * @dev Verification layer for membership validation
 * 
 * This contract serves as the oracle/verification point for:
 * - Off-chain services to verify membership validity
 * - Cross-chain membership verification (via bridging)
 * - Rate-limited access checks (prevent brute force)
 * - Event verification for gating
 *
 * Designed to integrate with:
 * - API gateways and middleware
 * - Mobile apps
 * - Enterprise systems
 */
contract AccessControl is Ownable {
    // ============ INTERFACES ============
    
    interface IMembershipToken {
        function isValidMembership(uint256 tokenId) external view returns (bool);
        function getMembershipDetails(uint256 tokenId) external view returns (
            uint8 tier,
            uint256 expiresAt,
            bool soulbound,
            uint32 usageCount,
            uint32 maxUsages,
            bytes32 organizationId,
            bool isActive
        );
        function ownerOf(uint256 tokenId) external view returns (address);
    }

    // ============ DATA STRUCTURES ============
    
    struct AccessPolicy {
        bytes32 organizationId;
        uint8 minTier;              // minimum tier required
        bool requireValid;          // must be non-expired
        uint32 maxSimultaneousUsers; // concurrent user limit
        bool enabled;
    }
    
    struct AccessLog {
        address user;
        uint256 tokenId;
        uint256 timestamp;
        bool granted;
        string reason;
    }

    // ============ STATE ============
    
    IMembershipToken public membershipToken;
    
    mapping(bytes32 => AccessPolicy) public policies;
    mapping(bytes32 => AccessLog[]) public accessLogs; // org -> logs
    mapping(bytes32 => uint32) public currentActiveUsers; // org -> active count
    mapping(address => uint256) public userLastAccessTime;
    
    uint256 public rateLimitWindow = 60 seconds;
    uint256 public rateLimitMaxAttempts = 10;
    
    // ============ EVENTS ============
    
    event AccessGranted(
        address indexed user,
        uint256 indexed tokenId,
        bytes32 indexed organizationId,
        uint8 tier
    );
    
    event AccessDenied(
        address indexed user,
        uint256 indexed tokenId,
        bytes32 indexed organizationId,
        string reason
    );
    
    event PolicyUpdated(
        bytes32 indexed organizationId,
        uint8 minTier,
        bool requireValid,
        uint32 maxSimultaneousUsers
    );
    
    event UserExited(
        address indexed user,
        bytes32 indexed organizationId
    );

    // ============ CONSTRUCTOR ============
    
    constructor(address _membershipToken) Ownable(msg.sender) {
        require(_membershipToken != address(0), "Invalid token address");
        membershipToken = IMembershipToken(_membershipToken);
    }

    // ============ POLICY MANAGEMENT ============
    
    /**
     * @dev Set access policy for an organization
     */
    function setAccessPolicy(
        bytes32 organizationId,
        uint8 minTier,
        bool requireValid,
        uint32 maxSimultaneousUsers
    ) external onlyOwner {
        policies[organizationId] = AccessPolicy({
            organizationId: organizationId,
            minTier: minTier,
            requireValid: requireValid,
            maxSimultaneousUsers: maxSimultaneousUsers,
            enabled: true
        });
        
        emit PolicyUpdated(organizationId, minTier, requireValid, maxSimultaneousUsers);
    }
    
    /**
     * @dev Disable a policy (soft delete)
     */
    function disablePolicy(bytes32 organizationId) external onlyOwner {
        policies[organizationId].enabled = false;
    }

    // ============ ACCESS VERIFICATION ============
    
    /**
     * @dev Check if user can access a resource
     * Primary entry point for access verification
     * Returns true if access granted, false otherwise
     */
    function canAccess(
        address user,
        uint256 tokenId,
        bytes32 organizationId
    ) external returns (bool) {
        // Check policy exists and is enabled
        AccessPolicy memory policy = policies[organizationId];
        require(policy.enabled, "Policy not enabled");
        
        // Verify token ownership
        if (membershipToken.ownerOf(tokenId) != user) {
            _logAccess(user, tokenId, organizationId, false, "Not token owner");
            emit AccessDenied(user, tokenId, organizationId, "Not token owner");
            return false;
        }
        
        // Verify membership validity
        if (policy.requireValid && !membershipToken.isValidMembership(tokenId)) {
            _logAccess(user, tokenId, organizationId, false, "Membership invalid or expired");
            emit AccessDenied(user, tokenId, organizationId, "Membership invalid or expired");
            return false;
        }
        
        // Get membership details
        (uint8 tier,,,,,, bool isActive) = membershipToken.getMembershipDetails(tokenId);
        
        // Check tier requirement
        if (tier < policy.minTier) {
            _logAccess(user, tokenId, organizationId, false, "Insufficient tier");
            emit AccessDenied(user, tokenId, organizationId, "Insufficient tier");
            return false;
        }
        
        // Check simultaneous user limit
        if (policy.maxSimultaneousUsers > 0 && 
            currentActiveUsers[organizationId] >= policy.maxSimultaneousUsers) {
            _logAccess(user, tokenId, organizationId, false, "Capacity limit reached");
            emit AccessDenied(user, tokenId, organizationId, "Capacity limit reached");
            return false;
        }
        
        // Check rate limiting
        if (!_checkRateLimit(user)) {
            _logAccess(user, tokenId, organizationId, false, "Rate limit exceeded");
            emit AccessDenied(user, tokenId, organizationId, "Rate limit exceeded");
            return false;
        }
        
        // All checks passed
        currentActiveUsers[organizationId]++;
        userLastAccessTime[user] = block.timestamp;
        
        _logAccess(user, tokenId, organizationId, true, "Access granted");
        emit AccessGranted(user, tokenId, organizationId, tier);
        
        return true;
    }
    
    /**
     * @dev Verify access without state modification (read-only)
     * Safe for view calls and external verification
     */
    function verifyAccess(
        address user,
        uint256 tokenId,
        bytes32 organizationId
    ) external view returns (bool, string memory) {
        // Check policy exists and is enabled
        AccessPolicy memory policy = policies[organizationId];
        if (!policy.enabled) {
            return (false, "Policy not enabled");
        }
        
        // Verify token ownership
        if (membershipToken.ownerOf(tokenId) != user) {
            return (false, "Not token owner");
        }
        
        // Verify membership validity
        if (policy.requireValid && !membershipToken.isValidMembership(tokenId)) {
            return (false, "Membership invalid or expired");
        }
        
        // Get membership details
        (uint8 tier,,,,,, bool isActive) = membershipToken.getMembershipDetails(tokenId);
        
        if (!isActive) {
            return (false, "Membership revoked");
        }
        
        // Check tier requirement
        if (tier < policy.minTier) {
            return (false, "Insufficient tier");
        }
        
        // Check simultaneous user limit
        if (policy.maxSimultaneousUsers > 0 && 
            currentActiveUsers[organizationId] >= policy.maxSimultaneousUsers) {
            return (false, "Capacity limit reached");
        }
        
        return (true, "Access granted");
    }
    
    /**
     * @dev User exits (decrement active users)
     */
    function userExit(address user, bytes32 organizationId) external {
        require(currentActiveUsers[organizationId] > 0, "No active users");
        currentActiveUsers[organizationId]--;
        emit UserExited(user, organizationId);
    }

    // ============ INTERNAL HELPERS ============
    
    /**
     * @dev Rate limiting check
     */
    function _checkRateLimit(address user) internal view returns (bool) {
        uint256 lastAccess = userLastAccessTime[user];
        if (lastAccess == 0) return true;
        
        // Simple exponential backoff - can be enhanced
        return (block.timestamp - lastAccess) >= rateLimitWindow;
    }
    
    /**
     * @dev Log access attempt
     */
    function _logAccess(
        address user,
        uint256 tokenId,
        bytes32 organizationId,
        bool granted,
        string memory reason
    ) internal {
        accessLogs[organizationId].push(AccessLog({
            user: user,
            tokenId: tokenId,
            timestamp: block.timestamp,
            granted: granted,
            reason: reason
        }));
    }

    // ============ ADMIN ============
    
    /**
     * @dev Update rate limit settings
     */
    function setRateLimitWindow(uint256 newWindow) external onlyOwner {
        rateLimitWindow = newWindow;
    }
    
    /**
     * @dev Get access logs for organization (paginated)
     */
    function getAccessLogs(bytes32 organizationId, uint256 startIdx, uint256 count)
        external
        view
        returns (AccessLog[] memory)
    {
        AccessLog[] storage logs = accessLogs[organizationId];
        require(startIdx < logs.length, "Index out of bounds");
        
        uint256 endIdx = startIdx + count > logs.length ? logs.length : startIdx + count;
        AccessLog[] memory result = new AccessLog[](endIdx - startIdx);
        
        for (uint256 i = startIdx; i < endIdx; i++) {
            result[i - startIdx] = logs[i];
        }
        
        return result;
    }
}
