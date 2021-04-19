// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// TODO: Change string to the appropriate data type.
// Find out how to mint images/videos/audio.

contract Token is ERC721 {
  string[] public tokens;

  constructor() ERC721("Token", "LT") {}

  function mint(string memory _token) public {
    tokens.push(_token);
    uint _id = tokens.length;
    _safeMint(msg.sender, _id);
  }
}
