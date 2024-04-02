// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Checkout {
    address public seller;

    constructor(address _seller) {
       seller = _seller;
    }

   function buy(address payable user, uint totalAmount) external {
        require(user != address(0), "Invalid user address");
        require(totalAmount > 0, "Total amount must be greater than zero");
        require(msg.sender == seller, "Only the seller can initiate the purchase");
        require(address(this).balance >= totalAmount, "Contract does not have enough balance");

        // Transfer Ether from user's address to seller's address
        user.transfer(totalAmount);
    }
}
