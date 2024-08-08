// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoAvatars is ERC721, Ownable {
    // Token ID tracker
    uint256 private _currentTokenId;

    // Mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor(address initialOwner) ERC721("CryptoAvatars", "CAVATAR") Ownable(initialOwner) {
        // Initialize the token ID tracker
        _currentTokenId = 0;
    }

    function mintNFT(address recipient, string memory _tokenURI) public onlyOwner returns (uint256) {
        // Increment the token ID
        _currentTokenId++;

        uint256 newItemId = _currentTokenId;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}