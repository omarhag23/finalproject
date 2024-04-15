// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Checkout {
   address public owner;
    mapping(address => uint) public balances;

    constructor(address payable seller) {
        owner = seller; // Set the contract deployer as the owner
    }

    function deposit(address payable user, uint amount) public payable {
        balances[user] += amount;
    }

    function buy(address payable user, uint amount) public payable {
        require(balances[user] >= amount, "InsUfficient balance");
        balances[user] -= amount;
        balances[owner]+=amount; // Transfer the ether to the owner
    }
    
        function getBalance(address account) public view returns (uint) {
        return balances[account];
    }
}
