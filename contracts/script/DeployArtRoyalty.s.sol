// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ArtRoyaltyNFT.sol";
import "../src/ArtRoyaltyMarketplace.sol";

contract DeployArtRoyalty is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("b1ffc045419d700c77ae201c56e6b68de79ffdf4e42acf0c2e91d4546d3623cb"); 

        vm.startBroadcast(deployerPrivateKey);

        // Deploy NFT contract
        ArtRoyaltyNFT nft = new ArtRoyaltyNFT();
        console.log("ArtRoyaltyNFT deployed to:", address(nft));

        // Deploy Marketplace contract
        ArtRoyaltyMarketplace marketplace = new ArtRoyaltyMarketplace();
        console.log("ArtRoyaltyMarketplace deployed to:", address(marketplace));

        // Set marketplace address in NFT contract
        nft.setMarketplace(address(marketplace));
        console.log("Marketplace address set in NFT contract");

        vm.stopBroadcast();
        
        console.log("\n=== Deployment Summary ===");
        console.log("NFT Contract:", address(nft));
        console.log("Marketplace Contract:", address(marketplace));
        console.log("==========================\n");
    }
}
