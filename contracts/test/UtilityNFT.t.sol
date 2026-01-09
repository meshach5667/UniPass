// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/UtilityNFT.sol";

contract UtilityNFTTest is Test {
    UtilityNFT nft;
    address alice = address(0x1);

    function setUp() public {
        nft = new UtilityNFT();
    }

    function testMintAndRedeem() public {
        // contract deployer is owner
        // mint a membership to alice
        uint256 expiry = block.timestamp + 1 days;
        uint256 tokenId = nft.mintUtility(alice, "ipfs://meta", 2, expiry, false);

        assertTrue(nft.isValid(tokenId));

        // redeem as alice
        vm.prank(alice);
        nft.redeem(tokenId);

        // now invalid
        assertFalse(nft.isValid(tokenId));
    }

    function testCannotTransferAfterRedeem() public {
        uint256 tokenId = nft.mintUtility(alice, "ipfs://meta2", 1, 0, false);

        // redeem
        vm.prank(alice);
        nft.redeem(tokenId);

        // attempt transfer should revert
        vm.prank(alice);
        vm.expectRevert(bytes("Token has been redeemed and is locked"));
        nft.safeTransferFrom(alice, address(0x2), tokenId);
    }
}
