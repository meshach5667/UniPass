// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PaymentProcessor
 * @dev Handles all payment processing for memberships and tickets
 * 
 * Features:
 * - Multi-currency support (USDC, USDT, native ETH/stablecoins)
 * - Automatic split payments (platform fee + organizer)
 * - Refund handling
 * - Payment tracking for analytics
 * - Compatible with Lisk L2 and other chains
 */
contract PaymentProcessor is ReentrancyGuard, Ownable {
    // ============ DATA STRUCTURES ============
    
    struct PaymentConfig {
        address tokenAddress;      // IERC20 token or address(0) for native
        bool enabled;
        uint256 minAmount;
        uint256 maxAmount;
    }
    
    struct Payment {
        bytes32 organizationId;
        address payer;
        uint256 amount;
        address tokenAddress;
        uint256 timestamp;
        string paymentReason;  // "ticket_purchase", "membership_renewal", etc
        bool refunded;
    }
    
    struct OrganizerBalance {
        uint256 ethBalance;
        mapping(address => uint256) tokenBalances;
    }

    // ============ STATE ============
    
    mapping(address => PaymentConfig) public acceptedTokens;
    mapping(uint256 => Payment) public payments;
    mapping(bytes32 => OrganizerBalance) public organizerBalances;
    
    uint256 public platformFeePercentage = 250; // 2.5% = 250 basis points
    address public platformWallet;
    uint256 private _paymentIdCounter;
    
    // ============ EVENTS ============
    
    event PaymentProcessed(
        uint256 indexed paymentId,
        bytes32 indexed organizationId,
        address indexed payer,
        uint256 amount,
        address tokenAddress,
        string reason
    );
    
    event PaymentRefunded(
        uint256 indexed paymentId,
        address indexed recipient,
        uint256 amount
    );
    
    event TokenEnabled(address indexed token, uint256 minAmount, uint256 maxAmount);
    event TokenDisabled(address indexed token);
    event FeeUpdated(uint256 newFeePercentage);
    event WithdrawalProcessed(
        bytes32 indexed organizationId,
        address recipient,
        uint256 amount,
        address tokenAddress
    );

    // ============ MODIFIERS ============
    
    modifier validToken(address token) {
        require(acceptedTokens[token].enabled, "Token not accepted");
        _;
    }

    // ============ CONSTRUCTOR ============
    
    constructor(address _platformWallet) Ownable(msg.sender) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        platformWallet = _platformWallet;
        
        // Enable ETH by default (address 0 represents native)
        acceptedTokens[address(0)].enabled = true;
        acceptedTokens[address(0)].minAmount = 0.001 ether;
        acceptedTokens[address(0)].maxAmount = 1000 ether;
    }

    // ============ TOKEN MANAGEMENT ============
    
    /**
     * @dev Enable a payment token
     */
    function enableToken(
        address token,
        uint256 minAmount,
        uint256 maxAmount
    ) external onlyOwner {
        require(token != address(0) || maxAmount > 0, "Invalid token config");
        acceptedTokens[token].enabled = true;
        acceptedTokens[token].minAmount = minAmount;
        acceptedTokens[token].maxAmount = maxAmount;
        emit TokenEnabled(token, minAmount, maxAmount);
    }
    
    /**
     * @dev Disable a payment token
     */
    function disableToken(address token) external onlyOwner {
        acceptedTokens[token].enabled = false;
        emit TokenDisabled(token);
    }

    // ============ PAYMENT PROCESSING ============
    
    /**
     * @dev Process ETH payment for membership/ticket
     */
    function payWithNative(
        bytes32 organizationId,
        string calldata paymentReason
    ) external payable nonReentrant validToken(address(0)) returns (uint256) {
        require(msg.value >= acceptedTokens[address(0)].minAmount, "Amount too low");
        require(msg.value <= acceptedTokens[address(0)].maxAmount, "Amount too high");
        
        return _processPayment(organizationId, msg.sender, msg.value, address(0), paymentReason);
    }
    
    /**
     * @dev Process ERC20 token payment
     */
    function payWithToken(
        bytes32 organizationId,
        address token,
        uint256 amount,
        string calldata paymentReason
    ) external nonReentrant validToken(token) returns (uint256) {
        require(amount >= acceptedTokens[token].minAmount, "Amount too low");
        require(amount <= acceptedTokens[token].maxAmount, "Amount too high");
        
        // Transfer tokens from payer to contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        
        return _processPayment(organizationId, msg.sender, amount, token, paymentReason);
    }
    
    /**
     * @dev Internal payment processing with fee splitting
     */
    function _processPayment(
        bytes32 organizationId,
        address payer,
        uint256 amount,
        address tokenAddress,
        string calldata reason
    ) internal returns (uint256) {
        require(organizationId != bytes32(0), "Invalid organization");
        
        // Calculate fees
        uint256 platformFee = (amount * platformFeePercentage) / 10000;
        uint256 organizerAmount = amount - platformFee;
        
        // Record payment
        uint256 paymentId = _paymentIdCounter++;
        payments[paymentId] = Payment({
            organizationId: organizationId,
            payer: payer,
            amount: amount,
            tokenAddress: tokenAddress,
            timestamp: block.timestamp,
            paymentReason: reason,
            refunded: false
        });
        
        // Update balances
        if (tokenAddress == address(0)) {
            organizerBalances[organizationId].ethBalance += organizerAmount;
        } else {
            organizerBalances[organizationId].tokenBalances[tokenAddress] += organizerAmount;
        }
        
        emit PaymentProcessed(paymentId, organizationId, payer, amount, tokenAddress, reason);
        
        return paymentId;
    }

    // ============ WITHDRAWAL ============
    
    /**
     * @dev Withdraw funds to organizer
     * Only contract owner can authorize withdrawals (for security)
     */
    function withdrawFunds(
        bytes32 organizationId,
        address recipient,
        address tokenAddress,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(recipient != address(0), "Invalid recipient");
        
        if (tokenAddress == address(0)) {
            require(organizerBalances[organizationId].ethBalance >= amount, "Insufficient balance");
            organizerBalances[organizationId].ethBalance -= amount;
            
            (bool success, ) = recipient.call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            uint256 balance = organizerBalances[organizationId].tokenBalances[tokenAddress];
            require(balance >= amount, "Insufficient token balance");
            organizerBalances[organizationId].tokenBalances[tokenAddress] -= amount;
            
            IERC20(tokenAddress).transfer(recipient, amount);
        }
        
        emit WithdrawalProcessed(organizationId, recipient, amount, tokenAddress);
    }
    
    /**
     * @dev Withdraw platform fees
     */
    function withdrawPlatformFees(address tokenAddress, uint256 amount) external onlyOwner nonReentrant {
        if (tokenAddress == address(0)) {
            require(address(this).balance >= amount, "Insufficient ETH");
            (bool success, ) = platformWallet.call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20(tokenAddress).transfer(platformWallet, amount);
        }
    }

    // ============ REFUNDS ============
    
    /**
     * @dev Process refund for a payment
     */
    function refundPayment(uint256 paymentId, address recipient) external onlyOwner nonReentrant {
        Payment storage payment = payments[paymentId];
        require(!payment.refunded, "Already refunded");
        require(payment.payer != address(0), "Invalid payment");
        
        payment.refunded = true;
        
        if (payment.tokenAddress == address(0)) {
            (bool success, ) = recipient.call{value: payment.amount}("");
            require(success, "Refund failed");
        } else {
            IERC20(payment.tokenAddress).transfer(recipient, payment.amount);
        }
        
        emit PaymentRefunded(paymentId, recipient, payment.amount);
    }

    // ============ ADMIN ============
    
    /**
     * @dev Update platform fee percentage
     */
    function setPlatformFee(uint256 newFeePercentage) external onlyOwner {
        require(newFeePercentage <= 1000, "Fee too high (max 10%)");
        platformFeePercentage = newFeePercentage;
        emit FeeUpdated(newFeePercentage);
    }
    
    /**
     * @dev Get balance for organization
     */
    function getOrganizerBalance(bytes32 organizationId, address tokenAddress) 
        external 
        view 
        returns (uint256)
    {
        if (tokenAddress == address(0)) {
            return organizerBalances[organizationId].ethBalance;
        } else {
            return organizerBalances[organizationId].tokenBalances[tokenAddress];
        }
    }
    
    /**
     * @dev Emergency receive ETH
     */
    receive() external payable {}
}
