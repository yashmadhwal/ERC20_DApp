// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract MyToken is ERC20, Ownable {
    // constructor(uint256 initialSupply) ERC20('MyPrivateToken', "MPT") {
        constructor() ERC20('MyPrivateToken', "MPT") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
