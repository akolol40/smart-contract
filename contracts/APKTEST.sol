pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract APKTEST is ERC20 {
    constructor(uint256 inital) ERC20("APKTEST", "APKT") {
      _mint(msg.sender, inital);
    }
  
}
